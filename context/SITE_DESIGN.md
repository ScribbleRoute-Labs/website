# ScribbleRoute Labs - V1 Website Context

## 1. Brand Identity & Mantra
- **Organization Name:** ScribbleRoute Labs
- **Core Philosophy:** "Always Local-First." Software should be fast, private, open, and work 100% offline out of the box with zero cloud lock-in. Accounts/Internet are entirely optional power-ups, never gatekeepers.
- **Tone:** Clean, high-performance, engineering-forward, yet deeply empathetic and transparent to modern parents.

## 2. Product Architecture Ecosystem
The website must describe an ecosystem consisting of three distinct layers:

1. **ScribbleBox (The Arcade App):**
   - A language-agnostic digital toy chest filled with mini-games (e.g., Scribble Paint, Shape Matcher, Sound Popper) designed for toddlers aged 3-5.
   - Built with zero text, zero menus, and toddler ergonomics to foster pure independent exploration. 

2. **ScribbleKeep (The Local Control App - Free):**
   - The private, local mailbox application that lives on the same physical device as ScribbleBox.
   - Runs 100% offline, utilizing a local file/database configuration schema. 
   - Allows parents to set volume caps, configure screen-time boundaries via self-cleaning date-bound dictionaries, and view vector drawings created in Scribble Paint.

3. **ScribbleRemote (The Cloud Remote Control - Paid, One-Time Purchase):**
   - An optional premium phone application that links to the ScribbleKeep profile using Google Auth.
   - Allows true multi-device, remote cross-house control. Parents can adjust active volume caps, extend screen time sessions (+15 mins) via real-time silent data push notifications routing through a Rust API/K8s/Neon backend, and view synchronized vector artwork galleries.
   - **Monetization Manifesto:** A strict one-time lifetime purchase. No predatory recurring subscriptions or zombie billing for an app children naturally outgrow.

## 3. High-Priority Architectural Features to Showcase
- **Infinite-Resolution Memories:** Explain that Scribble Paint stores drawings locally as raw vector coordinate paths (`Flow` streaming) rather than lossy images, making them infinitely scalable and preserved forever.
- **The Stateless Switchboard:** Highlight the engineering integrity—our server infrastructure acts as a privacy-centric stateless routing switchboard that never tracks user habits.
- **Lazy Evaluation Resets:** Highlight that session timers use a stateless date-bound evaluation check rather than battery-draining background background services.