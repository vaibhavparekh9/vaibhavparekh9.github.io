# Controller Design for an Autonomous Vehicles | [GitHub](https://github.com/vaibhavparekh9/Controller-Design_Autonomous-Vehicle)
**Association:** Carnegie Mellon University  
**Course:** 24-677: Modern Control Theory for Robotics

---

<!-- IMG_LEFT: images/webots-hero.jpg | 20% -->

## Background

Designed and implemented a progression of control systems for an autonomous vehicle (Tesla Model 3) navigating CMU's iconic Buggy race course in the Webots simulator. Starting from basic PID control and advancing through pole placement, optimal control, and EKF-based localization.

**Tools:** Python, Webots 

<!-- /IMG_LEFT -->

---

<!-- IMG_RIGHT: images/bicycle_model.png | 22% -->
<!-- CAPTION: Fig. Bicycle model -->

## Vehicle Model

All controllers are built on the bicycle model.

- **States:** position (*X, Y*), velocity (*ẋ, ẏ*), yaw angle (*ψ*), yaw rate (*ψ̇*)
- **Inputs:** steering angle (*δ*) and longitudinal force (*F*)
- **Sensors:** GPS, compass, and gyroscope (via Webots)

The nonlinear dynamics are linearized into an error-based state-space form for controller design, with lateral tire forces modeled using cornering stiffness.

<!-- /IMG_RIGHT -->

---

## Project 1: PID Controller

- Implemented a PID lateral controller that computes steering angle *δ* by minimizing cross-track and heading errors relative to the reference trajectory.
- Implemented a PID longitudinal controller that regulates vehicle speed by controlling the driving force *F*.

<!-- YOUTUBE: XI6pwMaaLHI -->

---

## Project 2: Full-State Feedback via Pole Placement

- Designed a lateral full-state feedback controller to position the closed-loop poles for desired transient response.
- The error state vector *e = [e₁, ė₁, e₂, ė₂]* captures cross-track error, its rate, heading error, and yaw rate error.

---

## Project 3: LQR Optimal Control + A* Path Planning

- Replaced pole placement with a discrete-time infinite-horizon LQR controller for the lateral dynamics.
- Implemented the A* search algorithm for real-time path re-planning to overtake a slower vehicle on the track.

<!-- YOUTUBE: g6Iq03A9Es8 -->

---

## Project 4: EKF SLAM

- Implement Extended Kalman Filter Simultaneous Localization and Mapping (EKF SLAM) to control the vehicle without relying on direct GPS-based position and heading.
- Reused the LQR lateral + PID longitudinal controller, to operate on the EKF-estimated states instead of ground-truth sensor readings.

<!-- YOUTUBE: z4rxKnDlzhI -->
