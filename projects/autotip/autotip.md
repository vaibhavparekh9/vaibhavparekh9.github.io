# AutoTip: A Computer Vision based Pen Tracking and Writing System | [GitHub](https://github.com/vaibhavparekh9/AutoTip)

**Association:** Carnegie Mellon University  
**Course:** 24-678: Computer Vision for Engineers

---

<!-- IMG_RIGHT: images/setup.jpg -->
<!-- CAPTION: Fig. The setup -->

## Background

AutoTip revolutionizes digital note-taking by enabling real-time pen tracking on any surface, tailored for students, educators, and professionals seeking versatile, affordable, and sustainable solutions.

&nbsp;

## Tools

**Software:** Python, OpenCV, MediaPipe  
**Hardware:** Intel RealSense D435 depth camera

<!-- /IMG_RIGHT -->

---

<!-- IMG_LEFT: images/scribble.jpg | 30% -->
<!-- CAPTION: Fig. Scribbling in action! -->

## Key features

### Real-Time Display and Interaction

- Tracks the pen tip using the Lucas-Kanade Optical Flow method.
- Displays pen strokes in real-time, allowing immediate visual feedback.

### Boundary and Depth Detection

- Uses AprilTags to ensure pen strokes remain within a designated area.
- A depth limitation threshold pauses the recording when the pen is lifted between strokes/letters.

### Gesture-Based Controls

- MediaPipe allows custom intuitive hand gesture recognition for DRAW, ERASER, and SAVE modes.
- Eraser mode toggle: ✌🏼
- Save file: 🖐🏼

<!-- /IMG_LEFT -->

---

## Impact and innovation

- Provides a cost-effective and environmentally friendly alternative to traditional digital writing tools.
- Enhances user experience by allowing the freedom to choose any writing surface, pushing the boundaries of conventional digital note-taking.