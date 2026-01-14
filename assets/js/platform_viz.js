/**
 * Platform Visualization Module
 * Enhanced 3D-style visualization of drone/fixed-wing platforms
 */

const PlatformViz = (() => {
  let canvas = null;
  let ctx = null;
  let currentComponents = null;

  /**
   * Initialize canvas for visualization
   */
  const initCanvas = () => {
    canvas = document.createElement('canvas');
    canvas.style.width = '100%';
    canvas.style.height = '400px';
    canvas.width = 600;
    canvas.height = 400;
    ctx = canvas.getContext('2d');

    const vizContainer = document.querySelector('.viz-container');
    if (vizContainer) {
      // Clear existing content
      vizContainer.innerHTML = '';
      vizContainer.appendChild(canvas);
    }
  };

  /**
   * Update visualization based on selected components
   */
  const updateVisualization = (components) => {
    currentComponents = components;

    if (!canvas) {
      initCanvas();
    }

    if (!ctx || !canvas) return;

    // Clear canvas
    ctx.fillStyle = '#0f131a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid background
    drawGrid();

    // Determine platform type
    const platformType = components.airframe?.type || 'multi-rotor';

    // Draw based on platform type
    if (platformType === 'fixed-wing') {
      drawFixedWing(components);
    } else {
      drawMultirotor(components);
    }

    // Draw component labels
    drawComponentLabels(components);
  };

  /**
   * Draw background grid
   */
  const drawGrid = () => {
    ctx.strokeStyle = '#1a2332';
    ctx.lineWidth = 1;

    // Vertical lines
    for (let x = 0; x < canvas.width; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }

    // Horizontal lines
    for (let y = 0; y < canvas.height; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
  };

  /**
   * Draw multirotor platform (quad/hexa/octo)
   */
  const drawMultirotor = (components) => {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const armLength = 100;

    // Determine number of motors
    const motorCount = components.motors?.length || 4;
    const angleStep = (Math.PI * 2) / motorCount;

    // Draw airframe center
    if (components.airframe) {
      // Center body
      ctx.fillStyle = '#667eea';
      ctx.beginPath();
      ctx.arc(centerX, centerY, 40, 0, Math.PI * 2);
      ctx.fill();

      // Airframe outline
      ctx.strokeStyle = '#8b9fef';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Airframe label
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 12px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('AIRFRAME', centerX, centerY + 5);
    } else {
      // Placeholder
      ctx.strokeStyle = '#ffffff33';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.arc(centerX, centerY, 40, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Draw motors and arms
    if (components.motors && components.motors.length > 0) {
      for (let i = 0; i < motorCount; i++) {
        const angle = angleStep * i - Math.PI / 2; // Start from top
        const armEndX = centerX + Math.cos(angle) * armLength;
        const armEndY = centerY + Math.sin(angle) * armLength;

        // Draw arm
        ctx.strokeStyle = '#4ade80';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(armEndX, armEndY);
        ctx.stroke();

        // Draw motor
        ctx.fillStyle = '#10b981';
        ctx.beginPath();
        ctx.arc(armEndX, armEndY, 15, 0, Math.PI * 2);
        ctx.fill();

        // Motor outline
        ctx.strokeStyle = '#34d399';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Propeller
        ctx.strokeStyle = '#ffffff44';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(armEndX, armEndY, 25, 0, Math.PI * 2);
        ctx.stroke();

        // Motor number
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 10px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(`M${i + 1}`, armEndX, armEndY + 4);
      }
    }

    // Draw battery (center, below airframe)
    if (components.battery) {
      ctx.fillStyle = '#fbbf24';
      ctx.fillRect(centerX - 30, centerY + 50, 60, 25);

      ctx.strokeStyle = '#fcd34d';
      ctx.lineWidth = 2;
      ctx.strokeRect(centerX - 30, centerY + 50, 60, 25);

      ctx.fillStyle = '#000000';
      ctx.font = 'bold 10px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('BATTERY', centerX, centerY + 65);
    }

    // Draw flight controller (center, top)
    if (components.flight_controller) {
      ctx.fillStyle = '#60a5fa';
      ctx.fillRect(centerX - 25, centerY - 15, 50, 20);

      ctx.strokeStyle = '#93c5fd';
      ctx.lineWidth = 2;
      ctx.strokeRect(centerX - 25, centerY - 15, 50, 20);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 9px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('FC', centerX, centerY - 2);
    }

    // Draw radio antenna
    if (components.radios && components.radios.length > 0) {
      ctx.strokeStyle = '#f472b6';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(centerX + 45, centerY - 10);
      ctx.lineTo(centerX + 45, centerY - 40);
      ctx.stroke();

      // Antenna tip
      ctx.fillStyle = '#f472b6';
      ctx.beginPath();
      ctx.arc(centerX + 45, centerY - 40, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw sensors/cameras
    if (components.sensors && components.sensors.length > 0) {
      ctx.fillStyle = '#a78bfa';
      ctx.fillRect(centerX - 15, centerY + 15, 30, 15);

      ctx.strokeStyle = '#c4b5fd';
      ctx.lineWidth = 2;
      ctx.strokeRect(centerX - 15, centerY + 15, 30, 15);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 8px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('CAM', centerX, centerY + 26);
    }
  };

  /**
   * Draw fixed-wing platform
   */
  const drawFixedWing = (components) => {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Draw fuselage
    if (components.airframe) {
      // Main fuselage
      ctx.fillStyle = '#667eea';
      ctx.fillRect(centerX - 20, centerY - 100, 40, 180);

      ctx.strokeStyle = '#8b9fef';
      ctx.lineWidth = 3;
      ctx.strokeRect(centerX - 20, centerY - 100, 40, 180);

      // Nose cone
      ctx.beginPath();
      ctx.moveTo(centerX - 20, centerY - 100);
      ctx.lineTo(centerX, centerY - 130);
      ctx.lineTo(centerX + 20, centerY - 100);
      ctx.fill();
      ctx.stroke();

      // Wings
      ctx.fillRect(centerX - 120, centerY - 10, 240, 30);
      ctx.strokeRect(centerX - 120, centerY - 10, 240, 30);

      // Tail
      ctx.fillRect(centerX - 40, centerY + 70, 80, 15);
      ctx.strokeRect(centerX - 40, centerY + 70, 80, 15);

      // Vertical stabilizer
      ctx.fillRect(centerX - 10, centerY + 60, 20, 30);
      ctx.strokeRect(centerX - 10, centerY + 60, 20, 30);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 12px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('AIRFRAME', centerX, centerY + 5);
    }

    // Draw motor/propeller (nose)
    if (components.motors && components.motors.length > 0) {
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(centerX, centerY - 140, 20, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#34d399';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Propeller
      ctx.strokeStyle = '#ffffff44';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(centerX - 35, centerY - 140);
      ctx.lineTo(centerX + 35, centerY - 140);
      ctx.moveTo(centerX, centerY - 175);
      ctx.lineTo(centerX, centerY - 105);
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 10px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('MOTOR', centerX, centerY - 137);
    }

    // Draw battery (center fuselage)
    if (components.battery) {
      ctx.fillStyle = '#fbbf24';
      ctx.fillRect(centerX - 25, centerY + 20, 50, 30);

      ctx.strokeStyle = '#fcd34d';
      ctx.lineWidth = 2;
      ctx.strokeRect(centerX - 25, centerY + 20, 50, 30);

      ctx.fillStyle = '#000000';
      ctx.font = 'bold 10px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('BATTERY', centerX, centerY + 38);
    }

    // Draw flight controller
    if (components.flight_controller) {
      ctx.fillStyle = '#60a5fa';
      ctx.fillRect(centerX - 25, centerY - 30, 50, 20);

      ctx.strokeStyle = '#93c5fd';
      ctx.lineWidth = 2;
      ctx.strokeRect(centerX - 25, centerY - 30, 50, 20);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 9px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('FC', centerX, centerY - 17);
    }

    // Draw sensors/camera (nose)
    if (components.sensors && components.sensors.length > 0) {
      ctx.fillStyle = '#a78bfa';
      ctx.fillRect(centerX - 15, centerY - 80, 30, 20);

      ctx.strokeStyle = '#c4b5fd';
      ctx.lineWidth = 2;
      ctx.strokeRect(centerX - 15, centerY - 80, 30, 20);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 8px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('CAM', centerX, centerY - 68);
    }
  };

  /**
   * Draw component labels/legend
   */
  const drawComponentLabels = (components) => {
    const labels = [];
    let y = 20;

    ctx.font = '11px monospace';
    ctx.textAlign = 'left';

    if (components.airframe) {
      labels.push({ color: '#667eea', text: `Airframe: ${components.airframe.name}` });
    }
    if (components.motors && components.motors.length > 0) {
      labels.push({ color: '#10b981', text: `Motors: ${components.motors.length}x ${components.motors[0].name}` });
    }
    if (components.battery) {
      labels.push({ color: '#fbbf24', text: `Battery: ${components.battery.name}` });
    }
    if (components.flight_controller) {
      labels.push({ color: '#60a5fa', text: `FC: ${components.flight_controller.name}` });
    }
    if (components.escs) {
      labels.push({ color: '#f59e0b', text: `ESC: ${components.escs.name}` });
    }

    // Draw labels
    labels.forEach(label => {
      // Color dot
      ctx.fillStyle = label.color;
      ctx.beginPath();
      ctx.arc(15, y, 4, 0, Math.PI * 2);
      ctx.fill();

      // Text
      ctx.fillStyle = '#ffffff';
      ctx.fillText(label.text, 25, y + 4);
      y += 18;
    });

    // Platform type indicator
    const platformType = components.airframe?.type || 'unknown';
    ctx.fillStyle = '#ffffff66';
    ctx.font = 'bold 14px monospace';
    ctx.textAlign = 'right';
    ctx.fillText(platformType.toUpperCase(), canvas.width - 15, canvas.height - 15);
  };

  /**
   * Clear all visualizations
   */
  const clearVisualization = () => {
    if (ctx && canvas) {
      ctx.fillStyle = '#0f131a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      drawGrid();
    }
  };

  // Public API
  return {
    updateVisualization,
    clearVisualization
  };
})();
