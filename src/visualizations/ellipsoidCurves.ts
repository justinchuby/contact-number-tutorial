import { Vector3 } from 'three';

export const ELLIPSOID_AXES = [0.8, 1, 0.6] as const;

export function sampleEllipsoidCurves(steps = 100, length = 1.2) {
  const axes = new Vector3(...ELLIPSOID_AXES);
  const inverseSquares = new Vector3(
    1 / axes.x ** 2, 1 / axes.y ** 2, 1 / axes.z ** 2,
  );
  const q = (vector: Vector3) => vector.clone().multiply(inverseSquares);
  const point = new Vector3(1, 1, 0).normalize().multiply(axes);
  const direction = new Vector3(-axes.x, axes.y, axes.z).normalize();
  const normal = q(point).normalize();
  const ds = length / steps;

  // A unit-speed geodesic has acceleration normal to x·Qx = 1.
  const acceleration = (position: Vector3, velocity: Vector3) => {
    const gradient = q(position);
    return gradient.multiplyScalar(-velocity.dot(q(velocity)) / gradient.lengthSq());
  };

  // Scaling to a unit sphere turns the cutting ellipse into a plane circle.
  const scaledPoint = point.clone().divide(axes);
  const scaledDirection = direction.clone().divide(axes).normalize();
  const planeNormal = scaledDirection.clone().cross(normal.clone().divide(axes)).normalize();
  const center = planeNormal.multiplyScalar(scaledPoint.dot(planeNormal));
  const radial = scaledPoint.clone().sub(center);
  const around = scaledDirection.multiplyScalar(radial.length());
  const sectionPoint = (angle: number) => center.clone()
    .addScaledVector(radial, Math.cos(angle))
    .addScaledVector(around, Math.sin(angle)).multiply(axes);
  const angularSpeed = (angle: number) => 1 / radial.clone().multiplyScalar(-Math.sin(angle))
    .addScaledVector(around, Math.cos(angle)).multiply(axes).length();

  function sampleSide(step: number) {
    const geodesic: Vector3[] = [];
    const section: Vector3[] = [];
    const position = point.clone();
    const velocity = direction.clone();
    let angle = 0;

    for (let i = 0; i < steps; i += 1) {
      const a1 = acceleration(position, velocity);
      const v2 = velocity.clone().addScaledVector(a1, step / 2);
      const a2 = acceleration(position.clone().addScaledVector(velocity, step / 2), v2);
      const v3 = velocity.clone().addScaledVector(a2, step / 2);
      const a3 = acceleration(position.clone().addScaledVector(v2, step / 2), v3);
      const v4 = velocity.clone().addScaledVector(a3, step);
      const a4 = acceleration(position.clone().addScaledVector(v3, step), v4);
      position.addScaledVector(velocity, step / 6).addScaledVector(v2, step / 3)
        .addScaledVector(v3, step / 3).addScaledVector(v4, step / 6);
      velocity.addScaledVector(a1, step / 6).addScaledVector(a2, step / 3)
        .addScaledVector(a3, step / 3).addScaledVector(a4, step / 6);

      const w1 = angularSpeed(angle);
      const w2 = angularSpeed(angle + w1 * step / 2);
      const w3 = angularSpeed(angle + w2 * step / 2);
      const w4 = angularSpeed(angle + w3 * step);
      angle += step * (w1 + 2 * w2 + 2 * w3 + w4) / 6;

      geodesic.push(position.clone());
      section.push(sectionPoint(angle));
    }
    return { geodesic, section };
  }

  const backward = sampleSide(-ds);
  const forward = sampleSide(ds);
  return {
    point,
    direction,
    geodesicPoints: [...backward.geodesic.reverse(), point, ...forward.geodesic],
    normalSectionPoints: [...backward.section.reverse(), point, ...forward.section],
  };
}
