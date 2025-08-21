/**
 * ===========================================
 * เว็บงี้อแฟน - JavaScript Functions 💖
 * ===========================================
 */

// Global Variables
let globalStats = {
  visits: 0,
  yesCount: 0,
  noCount: 0
};

let currentImageIndex = 0;

// Image paths (update these to match your actual image files)
const images = [
  "images/1.jpg",  // แทนที่ด้วยชื่อไฟล์จริง
  "images/2.jpg",  // แทนที่ด้วยชื่อไฟล์จริง
  "images/3.jpg"   // แทนที่ด้วยชื่อไฟล์จริง
];

// Apology messages
const apologyMessages = [
  "ขอโทษนะคะ 💖 อย่าให้ยิ้มอีกครั้ง",
  "เราผิดเอง 😢 ช่วยให้อภัยหน่อย",
  "รักที่สุดเลย 💕 ไม่อยากงอนกัน",
  "ขอโทษที่ทำให้เสียใจ 🥺",
  "สัญญาจะไม่ทำอีก 💔",
  "ขอแค่ยิ้มให้เราหน่อยนะ 😊",
  "เค้าเสียใจจริง ๆ นะ 😭",
  "ไม่อยากให้เธอเสียอารมณ์ 💝",
  "ผิดจริง ๆ ขอโทษที 🙏",
  "รักเธอนะ อย่าโกรธนานๆ 💗"
];

/**
 * Load initial statistics and setup
 */
function loadStats() {
  // Load from localStorage if available
  const savedStats = localStorage.getItem('apologyStats');
  if (savedStats) {
    globalStats = JSON.parse(savedStats);
  }
  
  // Increment visit count
  globalStats.visits++;
  saveStats();
  updateStatsDisplay();
  
  // Show main content after loading
  setTimeout(() => {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('mainContent').style.display = 'block';
    
    // Start animations and show first message
    startAnimations();
    setTimeout(showApology, 500);
  }, 1000);
}

/**
 * Save statistics to localStorage
 */
function saveStats() {
  try {
    localStorage.setItem('apologyStats', JSON.stringify(globalStats));
  } catch (e) {
    console.warn('Cannot save to localStorage:', e);
  }
}

/**
 * Update statistics display
 */
function updateStatsDisplay() {
  document.getElementById('visitCount').textContent = globalStats.visits;
  document.getElementById('yesCount').textContent = globalStats.yesCount;
  document.getElementById('noCount').textContent = globalStats.noCount;
}

/**
 * Create floating heart animation
 */
function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  
  // Random heart emoji
  const hearts = ["💖", "💕", "💝", "💗", "💘", "❤️", "💙", "💜"];
  heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
  
  // Random horizontal position
  heart.style.left = Math.random() * 90 + 5 + "%";
  heart.style.bottom = "0px";
  
  document.body.appendChild(heart);
  
  // Remove heart after animation
  setTimeout(() => {
    if (heart.parentNode) {
      heart.remove();
    }
  }, 5000);
}

/**
 * Create sparkle animation
 */
function createSparkle() {
  const sparkle = document.createElement("div");
  sparkle.className = "sparkle";
  sparkle.style.left = Math.random() * 100 + "%";
  sparkle.style.top = Math.random() * 100 + "%";
  
  document.body.appendChild(sparkle);
  
  // Remove sparkle after animation
  setTimeout(() => {
    if (sparkle.parentNode) {
      sparkle.remove();
    }
  }, 3000);
}

/**
 * Start all animations
 */
function startAnimations() {
  // Create sparkles periodically
  setInterval(createSparkle, 400);
  
  // Create occasional hearts
  setInterval(createHeart, 2000);
  
  // Set first image
  document.getElementById('cuteImg').src = images[0];
  
  // Add click handler to image
  document.getElementById('cuteImg').onclick = function() {
    // Create hearts when image is clicked
    for (let i = 0; i < 5; i++) {
      setTimeout(createHeart, i * 200);
    }
    nextImage();
  };
}

/**
 * Switch to next image
 */
function nextImage() {
  currentImageIndex = (currentImageIndex + 1) % images.length;
  document.getElementById('cuteImg').src = images[currentImageIndex];
}

/**
 * Get random apology message
 */
function getRandomMessage() {
  return apologyMessages[Math.floor(Math.random() * apologyMessages.length)];
}

/**
 * Show apology message popup
 */
function showApology() {
  Swal.fire({
    title: "งี้อย่างสุดใจ 💖",
    text: getRandomMessage(),
    icon: "info",
    confirmButtonText: "ยังไม่ให้อภัย 😢",
    allowOutsideClick: false,
    backdrop: 'rgba(255,182,193,0.8)',
    customClass: {
      popup: 'swal-thai'
    }
  }).then(result => {
    if (!result.isConfirmed) {
      nextImage();
      setTimeout(showApology, 300);
    }
  });
}

/**
 * Handle forgiveness button click
 */
function forgive() {
  // Update statistics
  globalStats.yesCount++;
  saveStats();
  updateStatsDisplay();

  // Show success message
  Swal.fire({
    title: "เย้! 🥰",
    text: "เค้ารักเธอนะคะ 💖 สัญญาจะเป็นคนดี",
    icon: "success",
    confirmButtonText: "รักเธอเหมือนกัน 💕",
    backdrop: 'rgba(144,238,144,0.8)',
    customClass: {
      popup: 'swal-thai'
    }
  });

  // Create lots of hearts
  for (let i = 0; i < 25; i++) {
    setTimeout(createHeart, i * 100);
  }
  
  nextImage();
}

/**
 * Handle still angry button click
 */
function stillAngry() {
  // Update statistics
  globalStats.noCount++;
  saveStats();
  updateStatsDisplay();
  
  nextImage();

  // Show warning message
  Swal.fire({
    title: "ยังงอนอยู่ 😢",
    text: getRandomMessage(),
    icon: "warning",
    confirmButtonText: "โอเค งอนต่อ 😤",
    backdrop: 'rgba(255,160,122,0.8)',
    customClass: {
      popup: 'swal-thai'
    }
  });

  // Create fewer hearts
  for (let i = 0; i < 10; i++) {
    setTimeout(createHeart, i * 300);
  }
}

/**
 * Utility function to show current statistics (for debugging)
 */
function showStats() {
  console.log("📊 สถิติปัจจุบัน:", globalStats);
  alert(`📊 สถิติปัจจุบัน:
เปิดเว็บ: ${globalStats.visits} ครั้ง
ให้อภัย: ${globalStats.yesCount} ครั้ง  
ยังงอน: ${globalStats.noCount} ครั้ง`);
}

/**
 * Utility function to reset statistics (for debugging)
 */
function resetStats() {
  if (confirm("ต้องการรีเซ็ตสถิติทั้งหมดหรือไม่?")) {
    globalStats = { visits: 0, yesCount: 0, noCount: 0 };
    saveStats();
    updateStatsDisplay();
    console.log("🔄 รีเซ็ตสถิติแล้ว");
    alert("🔄 รีเซ็ตสถิติเรียบร้อยแล้ว!");
  }
}

/**
 * Initialize the application when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', function() {
  console.log("💖 เว็บงี้อแฟน กำลังโหลด...");
});

/**
 * Initialize the application when window is loaded
 */
window.onload = function() {
  loadStats();
  console.log("✨ เว็บงี้อแฟน พร้อมใช้งานแล้ว!");
  console.log("💡 เคล็ดลับ: พิมพ์ showStats() เพื่อดูสถิติ หรือ resetStats() เพื่อรีเซ็ต");
};