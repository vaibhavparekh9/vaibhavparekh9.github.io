# F1-Tenth Autonomous Racing: Reactive Navigation

**Association:** Carnegie Mellon University  
**Course:** 16-663: F1-Tenth Autonomous Racing

---

## Background

F1-Tenth is a 1/10th scale autonomous racing platform. Reactive methods used here utilize a 2D LIDAR, navigating using only real-time sensor data, *without* a prior map of the environment.

**Tools:** Python, ROS2, RViz, Nvidia Jetson, Hokuyo UST-10LX LIDAR

---

## Wall Following

Implemented a PID wall-following controller that maintains a desired lateral offset from the left wall.

Two LIDAR beams, one at 90° (directly left) and one at 45°, yield distances *b* and *a*, from which the car's heading relative to the wall is estimated as: 
**α = arctan((a·cosθ − b) / (a·sinθ))**.

The current perpendicular distance is **Dₜ = b·cosα**, and a lookahead projects the future distance as **Dₜ₊₁ = Dₜ + L·sinα**. The PD controller steers to minimize Dₜ₊₁ − D_desired, with speed scaled inversely with steering magnitude.

<!-- YOUTUBE_ROW: Tn7SrwkJKDU | pvLhgsCah30 -->

---

## Follow the Gap

Developed a reactive obstacle avoidance algorithm that identifies and pulls the car into the largest free-space gap in the LIDAR scan.

**Disparity extension:** At sharp depth transitions between adjacent beams, the nearer range is propagated into the gap to account for the car's physical width — preventing cuts into unseen obstacles.

The longest contiguous run of non-zero ranges is identified, and the car steers toward the geometric center of that gap.

<!-- YOUTUBE_ROW: jlTmL_PDzMo | PJs8G4z46gw -->

---

## Automatic Emergency Braking (AEB)

Implemented a safety node that prevents collisions by computing Instantaneous Time to Collision (iTTC) for each LIDAR beam in a forward-facing field of view. The range rate along each beam is derived from the vehicle's longitudinal velocity: **iTTCᵢ = rᵢ / max(vₓ·cosθᵢ, 0)**

If the minimum iTTC across all beams drops below a threshold (0.5 s), the node immediately publishes a zero-speed brake command. 

<!-- YOUTUBE: SUoKP6rrRPg -->