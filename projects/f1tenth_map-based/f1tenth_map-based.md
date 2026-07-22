# F1-Tenth Autonomous Racing: Map-based Navigation | [GitHub](https://github.com/vaibhavparekh9/f1tenth_autonomous_racing)

**Association:** Carnegie Mellon University  
**Course:** 16-663: F1-Tenth Autonomous Racing

---

## Background

F1-Tenth is a 1/10th scale autonomous racing platform. Map-based methods leverage a prebuilt occupancy grid to plan and track an optimal racing path, enabling higher speeds on complex laps as compared to reactive approaches.

**Tools:** Python, ROS2, RViz, Nvidia Jetson, Hokuyo UST-10LX LIDAR

---

## Spotlight: Our 3 Winning Races

<div style="display:flex;gap:1rem">
<video src="../f1tenth_reactive/images/race-1.mp4" autoplay loop muted playsinline style="flex:1;min-width:0;border-radius:5px"></video>
<video src="../f1tenth_reactive/images/race-2.mp4" autoplay loop muted playsinline style="flex:1;min-width:0;border-radius:5px"></video>
<video src="images/race-3.mp4" autoplay loop muted playsinline style="flex:1;min-width:0;border-radius:5px"></video>
</div>

---

## Mapping and Localization

Used SLAM Toolbox for mapping the environment, and Particle Filter for localization.

<!-- YOUTUBE: Bglo3Uo3S8U -->

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
