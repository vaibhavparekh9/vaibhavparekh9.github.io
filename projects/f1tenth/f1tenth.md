# F1-Tenth Autonomous Racing | [GitHub](https://github.com/vaibhavparekh9/f1tenth_autonomous_racing)

**Association:** Carnegie Mellon University  
**Course:** 16-663: F1-Tenth Autonomous Racing

---

## Background

F1-Tenth is a 1/10th scale autonomous racing platform based on the Traxxas RC car. We utilize both Reactive as well as Map based methods for navigation. Reactive methods used here utilize a 2D LIDAR, navigating using only real-time sensor data, *without* a prior map of the environment. On the other hand, Map-based methods leverage a prebuilt occupancy grid to plan and track an optimal racing path, enabling higher speeds on complex laps as compared to reactive approaches.

**Tools:** Python, ROS2, RViz, Nvidia Jetson, Hokuyo UST-10LX LIDAR

---

## Spotlight: Our 3 Winning Races 🏆

<div style="display:flex;gap:1rem">
<video src="images/race-1.mp4" autoplay loop muted playsinline style="flex:1;min-width:0;border-radius:5px"></video>
<video src="images/race-2.mp4" autoplay loop muted playsinline style="flex:1;min-width:0;border-radius:5px"></video>
<video src="images/race-3.mp4" autoplay loop muted playsinline style="flex:1;min-width:0;border-radius:5px"></video>
</div>

---
# Map-based Navigation
---

## Pure Pursuit

Implemented a geometric path-tracking controller that follows a prerecorded set of waypoints around the track.

A waypoint logger records (x, y, θ) from odometry during a manual lap. At runtime, the controller finds the nearest waypoint and walks forward along the path to select a lookahead point at distance *L*. The goal is transformed into the vehicle frame and the steering curvature is computed as:

**γ = 2|y| / Ld²**

where *y* is the lateral offset of the goal in the vehicle frame and *Ld* is the Euclidean distance to it. Speed scales down with steering magnitude using an exponential decay.

<!-- YOUTUBE_ROW: MTXsTfBFmUI | ir02Xajkpvw -->

---

## RRT Motion Planning

Implemented Rapidly-exploring Random Trees (RRT) as a local planner for real-time obstacle avoidance while racing.

### Occupancy Grid

At each LIDAR scan, a local occupancy grid is constructed in the vehicle frame. Each valid range measurement is projected to a cell, and an inflation radius is applied around occupied cells for collision safety. 

<!-- YOUTUBE: l26VC70QJqI -->

---
# Reactive Navigation
---

## PID Wall Following

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
# Appendix
---

## Mapping and Localization

Used SLAM Toolbox for mapping the environment, and Particle Filter for localization.

<!-- YOUTUBE: Bglo3Uo3S8U -->

---

## Automatic Emergency Braking (AEB)

Implemented a safety node that prevents collisions by computing Instantaneous Time to Collision (iTTC) for each LIDAR beam in a forward-facing field of view. The range rate along each beam is derived from the vehicle's longitudinal velocity: **iTTCᵢ = rᵢ / max(vₓ·cosθᵢ, 0)**

If the minimum iTTC across all beams drops below a threshold (0.5 s), the node immediately publishes a zero-speed brake command. 

<!-- YOUTUBE: SUoKP6rrRPg -->