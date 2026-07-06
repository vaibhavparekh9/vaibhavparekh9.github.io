# Multi-Camera SLAM & Navigation in Isaac Sim | [GitHub](https://github.com/vaibhavparekh9/isaac-husky-visual-slam-nav/)

---

RGB-D visual SLAM and autonomous navigation for a Clearpath Husky in NVIDIA Isaac Sim. The 3 active RealSense D435 cameras feed RTAB-Map for multi-camera mapping and localization; Nav2 plans and executes paths on the saved map. Built as a higher-fidelity follow-on to the [custom robot project](https://vaibhavparekh9.github.io/projects/projects.html?p=autonomous-custom-bot); an OEM platform, multi-camera sensing, and simulation that better represents real-world deployment.

Tools/frameworks: ROS2, RTAB-Map, Nav2, RealSense ROS 

---

## Mapping

RTAB-Map fuses RGB-D frames from three cameras with wheel odometry to build a map with loop closure correction.

<div style="display: flex; justify-content: center; align-items: center;"><video src="images/husky_map.mp4" controls style="max-width: 800px;"></video></div>

---

## Navigation

RTAB-Map runs in localization mode on the saved map; Nav2 drives the Husky to goal poses in RViz.

<div style="display: flex; justify-content: center; align-items: center;"><video src="images/husky_nav2.mp4" controls style="max-width: 800px;"></video></div>

---

For setup instructions and architecture details, see the [project README on GitHub](https://github.com/vaibhavparekh9/isaac-husky-visual-slam-nav/).