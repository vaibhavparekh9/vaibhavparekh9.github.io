# Multi UAV Search and Rescue in Crowded Environments

**Association:** Carnegie Mellon University  
**Course:** 16-782: Planning and Decision-making in Robotics

---

<!-- IMG_LEFT: images/multi_uav_planning.jpg | 20% -->

## Background

Developed for enhanced search and rescue operations in disaster-stricken areas, leveraging a multi-UAV system to navigate crowded indoor environments effectively using RRT planning.

&nbsp;

## Tools

**Programming language:** MATLAB

<!-- /IMG_LEFT -->

---

<!-- IMG_RIGHT: images/occupancy_mapping.gif | 30% -->
<!-- CAPTION: Fig. Occupancy Mapping in Action -->

## UAV states

Each UAV navigates with states defined as {x, y, z, Θ}, focusing on Θ (yaw/heading) to optimize sensor orientation and mapping accuracy.

&nbsp;

## Algorithm highlights

### Occupancy Mapping

- UAVs start at predefined locations, using LIDAR to create occupancy maps that identify safe paths and victim locations.
- Maps are updated dynamically with new data from UAV scans.

<!-- /IMG_RIGHT -->

<!-- IMG_RIGHT: images/generated_occupancy_map.jpg | 30% -->
<!-- CAPTION: Generated occupancy map -->

### Next Best View (NBV)

- Strategically determines the most informative next locations for UAVs to maximize data collection and map completion.

### Multi-Goal RRT Planning

- Each UAV employs a robust RRT algorithm tailored for multiple goals, enhancing search efficiency.
- UAVs dynamically adjust paths based on real-time data, ensuring optimal coverage and rapid response.

<!-- /IMG_RIGHT -->

---

## Achievements

- Effectively implemented multi-goal RRT for coordinated UAV navigation, significantly improving search capabilities and efficiency in crowded, disaster-affected indoor environments.
- Advanced the use of LIDAR-based occupancy mapping to dynamically guide UAVs for optimal coverage.
