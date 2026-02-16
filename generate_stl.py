"""
Generate 3D-printable STL files of the non-spherical pseudo-umbilical surface
from Chen-Li's paper, Formula (10.20), using multiple projections from E⁶ to ℝ³.

Output: STL files in 3d-print/ directory, ~80mm bounding box, ~1.5mm wall thickness.
"""

import numpy as np
from stl import mesh
import os

# Formula (10.20) parameters
A = 1.0
C = 0.5
S3 = np.sqrt(3)
S2 = np.sqrt(2)
BETA = 2 * (A**2 + 6 * C**2) / 3
DELTA = (2 / 3) * np.sqrt(A**4 + 6 * A**2 * C**2 + 36 * C**4)
SQ_BP_D = np.sqrt(BETA + DELTA)
SQ_BM_D = np.sqrt(abs(BETA - DELTA))


def psi(u, v):
    """Compute ψ(u,v) ∈ E⁶ from Formula (10.20)."""
    au_s3 = A * u / S3
    av_s3 = A * v / S3
    cos2 = np.cos(au_s3) ** 2
    tan_au = np.tan(au_s3)

    sin_bm_v = np.sin(SQ_BM_D * v)
    sin_bp_v = np.sin(SQ_BP_D * v)
    cos_bm_v = np.cos(SQ_BM_D * v)
    cos_bp_v = np.cos(SQ_BP_D * v)
    a2 = A**2

    x1 = cos2 * (S3 / A) * tan_au * np.cos(av_s3)
    x2 = cos2 * (S3 / A) * tan_au * np.sin(av_s3)
    x3 = cos2 * (
        (3 * DELTA + 3 * BETA - 4 * a2) * sin_bm_v / (6 * DELTA * SQ_BM_D)
        + (3 * DELTA - 3 * BETA + 4 * a2) * sin_bp_v / (6 * DELTA * SQ_BP_D)
    )
    x4 = cos2 * (
        S2 * A * C * sin_bm_v / (DELTA * SQ_BP_D)
        - S2 * A * C * sin_bp_v / (DELTA * SQ_BM_D)
    )
    x5 = cos2 * (
        (2 * a2 - 3 * BETA - 3 * DELTA) * cos_bm_v / (4 * A * DELTA)
        - (2 * a2 - 3 * BETA + 3 * DELTA) * cos_bp_v / (4 * A * DELTA)
    )
    x6 = cos2 * (
        (2 * a2 + 3 * BETA + 3 * DELTA) * cos_bm_v / (4 * S3 * A * DELTA)
        - (2 * a2 + 3 * BETA - 3 * DELTA) * cos_bp_v / (4 * S3 * A * DELTA)
    )
    return np.stack([x1, x2, x3, x4, x5, x6], axis=-1)


def project(points_6d, matrix):
    """Project Nx6 array to Nx3 using a 3x6 projection matrix."""
    return points_6d @ np.array(matrix).T


def compute_normals(vertices, u_steps, v_steps):
    """Compute vertex normals from the grid for offset surface."""
    normals = np.zeros_like(vertices)
    for i in range(u_steps):
        for j in range(v_steps):
            idx = i * v_steps + j
            # Approximate normal via cross product of grid tangents
            i_next = min(i + 1, u_steps - 1)
            i_prev = max(i - 1, 0)
            j_next = (j + 1) % v_steps
            j_prev = (j - 1) % v_steps
            du = vertices[i_next * v_steps + j] - vertices[i_prev * v_steps + j]
            dv = vertices[i * v_steps + j_next] - vertices[i * v_steps + j_prev]
            n = np.cross(du, dv)
            norm = np.linalg.norm(n)
            if norm > 1e-10:
                normals[idx] = n / norm
            else:
                normals[idx] = np.array([0, 0, 1])
    return normals


def build_solid_mesh(vertices_3d, u_steps, v_steps, thickness=1.5):
    """
    Build a watertight solid mesh from a surface grid.
    Creates outer surface, inner (offset) surface, and side walls.
    """
    normals = compute_normals(vertices_3d, u_steps, v_steps)
    inner_vertices = vertices_3d - normals * thickness

    faces = []

    def add_quad(v0, v1, v2, v3):
        faces.append([v0, v1, v2])
        faces.append([v0, v2, v3])

    n_verts = u_steps * v_steps

    # Outer surface (original)
    for i in range(u_steps - 1):
        for j in range(v_steps - 1):
            i00 = i * v_steps + j
            i10 = (i + 1) * v_steps + j
            i01 = i * v_steps + (j + 1)
            i11 = (i + 1) * v_steps + (j + 1)
            add_quad(i00, i10, i11, i01)

    # Inner surface (offset, reversed winding)
    for i in range(u_steps - 1):
        for j in range(v_steps - 1):
            i00 = n_verts + i * v_steps + j
            i10 = n_verts + (i + 1) * v_steps + j
            i01 = n_verts + i * v_steps + (j + 1)
            i11 = n_verts + (i + 1) * v_steps + (j + 1)
            add_quad(i00, i01, i11, i10)  # reversed

    # Side walls: u boundaries (i=0 and i=u_steps-1)
    for j in range(v_steps - 1):
        # i = 0 edge
        o0 = j
        o1 = j + 1
        n0 = n_verts + j
        n1 = n_verts + j + 1
        add_quad(o0, o1, n1, n0)

        # i = u_steps-1 edge
        o0 = (u_steps - 1) * v_steps + j
        o1 = (u_steps - 1) * v_steps + j + 1
        n0 = n_verts + (u_steps - 1) * v_steps + j
        n1 = n_verts + (u_steps - 1) * v_steps + j + 1
        add_quad(o0, n0, n1, o1)  # reversed

    # Side walls: v boundaries (j=0 and j=v_steps-1)
    for i in range(u_steps - 1):
        # j = 0 edge
        o0 = i * v_steps
        o1 = (i + 1) * v_steps
        n0 = n_verts + i * v_steps
        n1 = n_verts + (i + 1) * v_steps
        add_quad(o0, n0, n1, o1)

        # j = v_steps-1 edge
        o0 = i * v_steps + (v_steps - 1)
        o1 = (i + 1) * v_steps + (v_steps - 1)
        n0 = n_verts + i * v_steps + (v_steps - 1)
        n1 = n_verts + (i + 1) * v_steps + (v_steps - 1)
        add_quad(o0, o1, n1, n0)

    all_vertices = np.vstack([vertices_3d, inner_vertices])
    faces = np.array(faces)

    stl_mesh = mesh.Mesh(np.zeros(len(faces), dtype=mesh.Mesh.dtype))
    for i, f in enumerate(faces):
        for j in range(3):
            stl_mesh.vectors[i][j] = all_vertices[f[j]]

    return stl_mesh


def generate_stl(name, proj_matrix, u_res=200, v_res=200):
    """Generate one STL file for a given projection."""
    u_max = S3 * np.pi / (2 * A) * 0.88  # truncate before pole
    v_max = 2 * np.pi * S3 / A

    u_vals = np.linspace(-u_max, u_max, u_res)
    v_vals = np.linspace(0, v_max, v_res)
    uu, vv = np.meshgrid(u_vals, v_vals, indexing='ij')

    # Compute 6D points
    pts_6d = psi(uu.ravel(), vv.ravel())

    # Filter out any non-finite
    valid = np.all(np.isfinite(pts_6d), axis=1)
    if not np.all(valid):
        print(f"  Warning: {np.sum(~valid)} non-finite points filtered")

    # Project to 3D
    pts_3d = project(pts_6d, proj_matrix)

    # Scale to ~80mm bounding box
    bbox = pts_3d.max(axis=0) - pts_3d.min(axis=0)
    scale = 80.0 / bbox.max()
    pts_3d *= scale

    # Center at origin
    center = (pts_3d.max(axis=0) + pts_3d.min(axis=0)) / 2
    pts_3d -= center

    # Wall thickness in mm (scaled)
    thickness = 1.5

    print(f"  Bounding box: {(pts_3d.max(axis=0) - pts_3d.min(axis=0)).round(1)} mm")
    print(f"  Vertices: {len(pts_3d)}, Wall thickness: {thickness} mm")

    stl_mesh = build_solid_mesh(pts_3d, u_res, v_res, thickness)

    outdir = os.path.join(os.path.dirname(__file__), '3d-print')
    os.makedirs(outdir, exist_ok=True)
    filepath = os.path.join(outdir, f'{name}.stl')
    stl_mesh.save(filepath)
    size_mb = os.path.getsize(filepath) / (1024 * 1024)
    print(f"  Saved: {filepath} ({size_mb:.1f} MB)")
    return filepath


PROJECTIONS = {
    'projection_x1_x2_x3': {
        'matrix': [[1,0,0,0,0,0],[0,1,0,0,0,0],[0,0,1,0,0,0]],
        'label': '(x₁, x₂, x₃)'
    },
    'projection_x1_x2_x4': {
        'matrix': [[1,0,0,0,0,0],[0,1,0,0,0,0],[0,0,0,1,0,0]],
        'label': '(x₁, x₂, x₄)'
    },
    'projection_x1_x2_x5': {
        'matrix': [[1,0,0,0,0,0],[0,1,0,0,0,0],[0,0,0,0,1,0]],
        'label': '(x₁, x₂, x₅)'
    },
    'projection_mixed': {
        'matrix': [
            [0.6, 0.3, 0, -0.3, 0.5, 0],
            [0, 0.5, 0.4, 0.3, 0, -0.3],
            [0.3, 0, -0.4, 0, 0.3, 0.6]
        ],
        'label': 'Mixed projection'
    },
}


if __name__ == '__main__':
    print("Generating 3D-printable STL files for Chen-Li Formula (10.20)")
    print(f"Parameters: a={A}, c={C}, β={BETA:.4f}, δ={DELTA:.4f}")
    print(f"Target: ~80mm bounding box, 1.5mm wall thickness\n")

    for name, proj in PROJECTIONS.items():
        print(f"[{proj['label']}]")
        generate_stl(name, proj['matrix'])
        print()

    print("Done! Files are in 3d-print/ directory.")
    print("Upload to a 3D printing service (e.g., Shapeways, JLCPCB, or local print shop).")
