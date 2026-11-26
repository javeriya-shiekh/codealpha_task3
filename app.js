    /* ------------------------------------------------------------------------
       A. INITIAL SAMPLE DATASET (9 PICSUM PHOTOS WITH VARIED HEIGHTS)
       ------------------------------------------------------------------------ */
    const DEFAULT_IMAGES = [
      {
        id: "img-1",
        title: "Misty Alpine Peaks",
        description: "Golden sunrise breaking over tranquil mountain ridges in the early morning mist.",
        category: "Nature",
        url: "https://picsum.photos/id/1018/600/850",
        photographer: "Aarav Mehta",
        dateAdded: "Nov 12, 2026",
        timestamp: 1794441600000,
        likes: 142,
        favourited: false,
        comments: [
          { text: "The morning fog looks unreal!", time: "2 hours ago" }
        ]
      },
      {
        id: "img-2",
        title: "Neon Downtown Skyline",
        description: "Modern glass skyscrapers reflecting twilight clouds across the financial district.",
        category: "City",
        url: "https://picsum.photos/id/1031/600/460",
        photographer: "Sophia Lin",
        dateAdded: "Nov 14, 2026",
        timestamp: 1794614400000,
        likes: 98,
        favourited: true,
        comments: []
      },
      {
        id: "img-3",
        title: "Wild Forest Fox",
        description: "A curious red fox pausing quietly on a moss-covered woodland trail.",
        category: "Animals",
        url: "https://picsum.photos/id/1025/600/900",
        photographer: "Liam O'Connor",
        dateAdded: "Nov 15, 2026",
        timestamp: 1794700800000,
        likes: 215,
        favourited: true,
        comments: [
          { text: "Such sharp focus and warm tones ❤️", time: "1 day ago" }
        ]
      },
      {
        id: "img-4",
        title: "Emerald Pine Valley",
        description: "Winding river cutting smoothly through an untouched evergreen canyon.",
        category: "Nature",
        url: "https://picsum.photos/id/1015/600/520",
        photographer: "Zara Khan",
        dateAdded: "Nov 16, 2026",
        timestamp: 1794787200000,
        likes: 176,
        favourited: false,
        comments: []
      },
      {
        id: "img-5",
        title: "Historic Cobblestone Avenue",
        description: "Warm afternoon sunlight illuminating classic European architecture and street cafes.",
        category: "City",
        url: "https://picsum.photos/id/1040/600/780",
        photographer: "Lucas Moretti",
        dateAdded: "Nov 17, 2026",
        timestamp: 1794873600000,
        likes: 114,
        favourited: false,
        comments: []
      },
      {
        id: "img-6",
        title: "Coastal Highland Herd",
        description: "Grazing peacefully along the breezy green cliffs overlooking the northern sea.",
        category: "Animals",
        url: "https://picsum.photos/id/1074/600/430",
        photographer: "Maya Patel",
        dateAdded: "Nov 18, 2026",
        timestamp: 1794960000000,
        likes: 189,
        favourited: false,
        comments: []
      },
      {
        id: "img-7",
        title: "Crystal Glacier Lake",
        description: "Mirror-like turquoise water reflecting snow-dusted peaks under a clear sky.",
        category: "Nature",
        url: "https://picsum.photos/id/1036/600/820",
        photographer: "Noah Lindqvist",
        dateAdded: "Nov 19, 2026",
        timestamp: 1795046400000,
        likes: 264,
        favourited: true,
        comments: []
      },
      {
        id: "img-8",
        title: "Harbor Bridge at Dusk",
        description: "City lights sparkling along the waterfront promenade just after sunset.",
        category: "City",
        url: "https://picsum.photos/id/1048/600/620",
        photographer: "Hannah Kim",
        dateAdded: "Nov 20, 2026",
        timestamp: 1795132800000,
        likes: 131,
        favourited: false,
        comments: []
      },
      {
        id: "img-9",
        title: "Golden Retriever Portrait",
        description: "Pure happiness captured during a sunny afternoon walk in the park.",
        category: "Animals",
        url: "https://picsum.photos/id/237/600/740",
        photographer: "Bilal Ahmed",
        dateAdded: "Nov 21, 2026",
        timestamp: 1795219200000,
        likes: 310,
        favourited: false,
        comments: []
      }
    ];

    /* ------------------------------------------------------------------------
       B. LOCALSTORAGE KEYS & APPLICATION STATE
       ------------------------------------------------------------------------ */
    const STORAGE_KEYS = {
      POSTS: "ultra_gallery_posts_v1",
      CATEGORIES: "ultra_gallery_categories_v1",
      THEME: "ultra_gallery_theme_v1",
      STYLE: "ultra_gallery_style_v1"
    };

    // Load saved posts or fall back to DEFAULT_IMAGES
    let posts = JSON.parse(localStorage.getItem(STORAGE_KEYS.POSTS)) || [...DEFAULT_IMAGES];

    // Load custom + default categories
    let categories = JSON.parse(localStorage.getItem(STORAGE_KEYS.CATEGORIES)) || [
      "Nature",
      "City",
      "Animals"
    ];

    // Ensure any category present in posts is also registered in categories array
    posts.forEach((p) => {
      if (p.category && !categories.includes(p.category)) {
        categories.push(p.category);
      }
    });

    // Current Filter, Search, Sort, and Lightbox state
    let activeFilter = "All";
    let searchQuery = "";
    let sortBy = "newest";
    let filteredPosts = [];
    let currentLightboxIndex = 0;
    let currentZoom = 1;
    let slideshowTimer = null;

    // Modal state: null = Upload Mode, string ID = Edit Mode
    let editingPostId = null;
    let uploadedDataUrl = "";

    /* ------------------------------------------------------------------------
       C. DOM ELEMENT REFERENCES
       ------------------------------------------------------------------------ */
    const masonryGrid = document.getElementById("masonryGrid");
    const emptyState = document.getElementById("emptyState");
    const filterBar = document.getElementById("filterBar");
    const searchInput = document.getElementById("searchInput");
    const sortSelect = document.getElementById("sortSelect");
    const themeToggleBtn = document.getElementById("themeToggleBtn");
    const colourStyleSelect = document.getElementById("colourStyleSelect");

    // Lightbox DOM elements
    const lightbox = document.getElementById("lightbox");
    const lbStage = document.getElementById("lbStage");
    const lbImage = document.getElementById("lbImage");
    const lbCounter = document.getElementById("lbCounter");
    const lbTitle = document.getElementById("lbTitle");
    const lbDescription = document.getElementById("lbDescription");
    const lbCategory = document.getElementById("lbCategory");
    const lbDate = document.getElementById("lbDate");
    const lbPhotographer = document.getElementById("lbPhotographer");
    const lbLikes = document.getElementById("lbLikes");
    const lbSlideshowBtn = document.getElementById("lbSlideshowBtn");
    const commentForm = document.getElementById("commentForm");
    const commentInput = document.getElementById("commentInput");
    const commentsList = document.getElementById("commentsList");

    // Upload / Edit Modal DOM elements
    const postModal = document.getElementById("postModal");
    const modalTitle = document.getElementById("modalTitle");
    const postForm = document.getElementById("postForm");
    const postImageInput = document.getElementById("postImageInput");
    const imageInputLabel = document.getElementById("imageInputLabel");
    const imagePreviewBox = document.getElementById("imagePreviewBox");
    const imagePreview = document.getElementById("imagePreview");
    const postTitleInput = document.getElementById("postTitleInput");
    const postCaptionInput = document.getElementById("postCaptionInput");
    const postCategorySelect = document.getElementById("postCategorySelect");
    const newCategoryBox = document.getElementById("newCategoryBox");
    const newCategoryInput = document.getElementById("newCategoryInput");
    const savePostBtn = document.getElementById("savePostBtn");

    // Toast element
    const toastEl = document.getElementById("toast");
    let toastTimeout = null;

    /* ------------------------------------------------------------------------
       D. HELPER FUNCTIONS (SAVE TO LOCALSTORAGE & TOAST NOTIFICATIONS)
       ------------------------------------------------------------------------ */
    function saveStateToStorage() {
      try {
        localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
        localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
      } catch (err) {
        console.warn("Storage quota exceeded or unavailable:", err);
      }
    }

    function showToast(message) {
      toastEl.textContent = message;
      toastEl.classList.add("show");
      clearTimeout(toastTimeout);
      toastTimeout = setTimeout(() => {
        toastEl.classList.remove("show");
      }, 2500);
    }

    /* ------------------------------------------------------------------------
       E. DARK / LIGHT MODE & COLOUR STYLES
       ------------------------------------------------------------------------ */
    function initThemeAndStyle() {
      // 1. Load saved Theme (Light / Dark)
      const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) || "light";
      document.documentElement.setAttribute("data-theme", savedTheme);
      themeToggleBtn.textContent = savedTheme === "dark" ? "☀️" : "🌙";

      // 2. Load saved Colour Style
      const savedStyle = localStorage.getItem(STORAGE_KEYS.STYLE) || "original";
      colourStyleSelect.value = savedStyle;
      applyColourStyle(savedStyle, false);
    }

    themeToggleBtn.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      const nextTheme = currentTheme === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", nextTheme);
      localStorage.setItem(STORAGE_KEYS.THEME, nextTheme);
      themeToggleBtn.textContent = nextTheme === "dark" ? "☀️" : "🌙";
    });

    function applyColourStyle(styleValue, notify = true) {
      let cssFilter = "none";
      if (styleValue === "bw") {
        cssFilter = "grayscale(100%)";
      } else if (styleValue === "sepia") {
        cssFilter = "sepia(85%)";
      } else if (styleValue === "vintage") {
        cssFilter = "contrast(1.15) saturate(1.3) sepia(30%)";
      }
      document.documentElement.style.setProperty("--img-filter", cssFilter);
      localStorage.setItem(STORAGE_KEYS.STYLE, styleValue);
      if (notify) {
        showToast("Style applied!");
      }
    }

    colourStyleSelect.addEventListener("change", (e) => {
      applyColourStyle(e.target.value, true);
    });

    /* ------------------------------------------------------------------------
       F. DYNAMIC FILTER BUTTONS & CATEGORY DROPDOWN POPULATION
       ------------------------------------------------------------------------ */
    function renderFilterButtons() {
      filterBar.innerHTML = "";

      // Build complete list: "All", dynamic categories, and "❤️ Favourites"
      const filterItems = [
        { label: "All", value: "All" },
        ...categories.map((cat) => ({ label: cat, value: cat })),
        { label: "❤️ Favourites", value: "Favourites" }
      ];

      filterItems.forEach((item) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "filter-btn" + (activeFilter === item.value ? " active" : "");
        btn.textContent = item.label;

        btn.addEventListener("click", () => {
          activeFilter = item.value;
          renderFilterButtons();
          renderGallery();
        });

        filterBar.appendChild(btn);
      });
    }

    function populateCategoryDropdown(selectedCategory = "Nature") {
      postCategorySelect.innerHTML = "";

      // Add all available categories
      categories.forEach((cat) => {
        const option = document.createElement("option");
        option.value = cat;
        option.textContent = cat;
        postCategorySelect.appendChild(option);
      });

      // Add "+ Add New Category..." option at the bottom
      const addNewOption = document.createElement("option");
      addNewOption.value = "__ADD_NEW__";
      addNewOption.textContent = "+ Add New Category...";
      postCategorySelect.appendChild(addNewOption);

      // Select requested category if it exists
      if (categories.includes(selectedCategory)) {
        postCategorySelect.value = selectedCategory;
        newCategoryBox.classList.remove("visible");
      } else {
        postCategorySelect.value = categories[0] || "__ADD_NEW__";
      }
    }

    // Show or hide custom category text input when dropdown changes
    postCategorySelect.addEventListener("change", () => {
      if (postCategorySelect.value === "__ADD_NEW__") {
        newCategoryBox.classList.add("visible");
        newCategoryInput.focus();
      } else {
        newCategoryBox.classList.remove("visible");
      }
    });

    /* ------------------------------------------------------------------------
       G. FILTER, SEARCH, SORT & RENDER MASONRY GALLERY
       ------------------------------------------------------------------------ */
    function getFilteredAndSortedPosts() {
      const query = searchQuery.trim().toLowerCase();

      // 1. Filter by Category or Favourites + Search Query
      const result = posts.filter((post) => {
        const matchesFilter =
          activeFilter === "All"
            ? true
            : activeFilter === "Favourites"
            ? Boolean(post.favourited)
            : post.category.toLowerCase() === activeFilter.toLowerCase();

        const matchesSearch =
          !query ||
          post.title.toLowerCase().includes(query) ||
          post.description.toLowerCase().includes(query) ||
          post.category.toLowerCase().includes(query);

        return matchesFilter && matchesSearch;
      });

      // 2. Sort Results
      result.sort((a, b) => {
        if (sortBy === "newest") {
          return (b.timestamp || 0) - (a.timestamp || 0);
        }
        if (sortBy === "oldest") {
          return (a.timestamp || 0) - (b.timestamp || 0);
        }
        if (sortBy === "az") {
          return a.title.localeCompare(b.title);
        }
        if (sortBy === "liked") {
          return (b.likes || 0) - (a.likes || 0);
        }
        return 0;
      });

      return result;
    }

    function renderGallery() {
      filteredPosts = getFilteredAndSortedPosts();
      masonryGrid.innerHTML = "";

      if (filteredPosts.length === 0) {
        emptyState.classList.add("visible");
        return;
      } else {
        emptyState.classList.remove("visible");
      }

      filteredPosts.forEach((post, index) => {
        // Create Card Element
        const card = document.createElement("article");
        card.className = "gallery-card";

        // Image with lazy loading & smooth blur-up transition
        const img = document.createElement("img");
        img.className = "card-image";
        img.src = post.url;
        img.alt = post.title;
        img.loading = "lazy";
        img.onload = () => img.classList.add("loaded");
        // In case cached image loads immediately
        if (img.complete) img.classList.add("loaded");

        // Top Actions: Like Counter (Top-Left) & Favourite Heart (Top-Right)
        const topActions = document.createElement("div");
        topActions.className = "card-top-actions";

        const likeBtn = document.createElement("button");
        likeBtn.type = "button";
        likeBtn.className = "badge-btn";
        likeBtn.innerHTML = `❤️ <span>${post.likes}</span>`;
        likeBtn.title = "Like this photo";
        likeBtn.addEventListener("click", (e) => {
          e.stopPropagation(); // Prevent opening lightbox
          post.likes += 1;
          saveStateToStorage();
          renderGallery();
          showToast("Liked!");
        });

        const favBtn = document.createElement("button");
        favBtn.type = "button";
        favBtn.className = "badge-btn fav-btn";
        favBtn.textContent = post.favourited ? "❤️" : "🤍";
        favBtn.title = post.favourited ? "Remove from Favourites" : "Add to Favourites";
        favBtn.addEventListener("click", (e) => {
          e.stopPropagation(); // Prevent opening lightbox
          post.favourited = !post.favourited;
          saveStateToStorage();
          renderGallery();
          showToast(post.favourited ? "Added to favourites" : "Removed");
        });

        topActions.appendChild(likeBtn);
        topActions.appendChild(favBtn);

        // Hover Overlay: Title + Description + Edit (✏️) + Delete (🗑️)
        const overlay = document.createElement("div");
        overlay.className = "card-overlay";

        const bottomRow = document.createElement("div");
        bottomRow.className = "overlay-bottom-row";

        const textWrap = document.createElement("div");
        textWrap.className = "overlay-text";
        textWrap.innerHTML = `
          <span class="overlay-category">${escapeHTML(post.category)}</span>
          <h3 class="overlay-title">${escapeHTML(post.title)}</h3>
          <p class="overlay-desc">${escapeHTML(post.description)}</p>
        `;

        // Edit & Delete Buttons (Bottom-Right on Hover)
        const editActions = document.createElement("div");
        editActions.className = "card-edit-actions";

        const editBtn = document.createElement("button");
        editBtn.type = "button";
        editBtn.className = "icon-action-btn";
        editBtn.textContent = "✏️";
        editBtn.title = "Edit Post";
        editBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          openEditModal(post.id);
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.className = "icon-action-btn delete-btn";
        deleteBtn.textContent = "🗑️";
        deleteBtn.title = "Delete Post";
        deleteBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          deletePost(post.id);
        });

        editActions.appendChild(editBtn);
        editActions.appendChild(deleteBtn);

        bottomRow.appendChild(textWrap);
        bottomRow.appendChild(editActions);
        overlay.appendChild(bottomRow);

        // Clicking the card opens the Full-Screen Lightbox
        card.addEventListener("click", () => openLightbox(index));

        card.appendChild(img);
        card.appendChild(topActions);
        card.appendChild(overlay);
        masonryGrid.appendChild(card);
      });
    }

    // Prevent XSS when rendering user-entered titles/captions/comments
    function escapeHTML(str) {
      const div = document.createElement("div");
      div.textContent = str;
      return div.innerHTML;
    }

    // Instant Search & Sort Listeners
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value;
      renderGallery();
    });

    sortSelect.addEventListener("change", (e) => {
      sortBy = e.target.value;
      renderGallery();
    });

    /* ------------------------------------------------------------------------
       H. UPLOAD & EDIT MODAL LOGIC (WITH EDITABLE & NEW CATEGORIES)
       ------------------------------------------------------------------------ */
    function openUploadModal() {
      editingPostId = null;
      uploadedDataUrl = "";
      modalTitle.textContent = "📤 Upload Photo + Caption";
      savePostBtn.textContent = "Publish Post";
      imageInputLabel.textContent = "Select Image *";
      postForm.reset();
      imagePreviewBox.classList.remove("has-image");
      imagePreview.src = "";
      populateCategoryDropdown("Nature");
      postModal.classList.add("active");
    }

    function openEditModal(postId) {
      const post = posts.find((p) => p.id === postId);
      if (!post) return;

      editingPostId = post.id;
      uploadedDataUrl = ""; // Only overwritten if user chooses a new image file
      modalTitle.textContent = "✏️ Edit Post";
      savePostBtn.textContent = "Save Changes";
      imageInputLabel.textContent = "Change Image (Optional)";

      // Pre-fill existing Title, Caption, Image Preview, and Category
      postTitleInput.value = post.title;
      postCaptionInput.value = post.description;
      imagePreview.src = post.url;
      imagePreviewBox.classList.add("has-image");

      // Ensure post's category is in dropdown (even if custom)
      if (!categories.includes(post.category)) {
        categories.push(post.category);
        renderFilterButtons();
      }
      populateCategoryDropdown(post.category);

      postModal.classList.add("active");
    }

    function closePostModal() {
      postModal.classList.remove("active");
      editingPostId = null;
      uploadedDataUrl = "";
    }

    // Live Image Preview using FileReader API
    postImageInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        uploadedDataUrl = event.target.result;
        imagePreview.src = uploadedDataUrl;
        imagePreviewBox.classList.add("has-image");
      };
      reader.readAsDataURL(file);
    });

    // Handle Form Submit for BOTH Upload and Edit
    postForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const title = postTitleInput.value.trim();
      const description = postCaptionInput.value.trim();
      let selectedCategory = postCategorySelect.value;

      // Resolve custom category if "+ Add New Category..." was chosen
      if (selectedCategory === "__ADD_NEW__") {
        const customCat = newCategoryInput.value.trim();
        if (!customCat) {
          showToast("Please type a new category name!");
          newCategoryInput.focus();
          return;
        }
        // Capitalize first letter nicely
        selectedCategory = customCat.charAt(0).toUpperCase() + customCat.slice(1);
      }

      // Add new category to categories array if not already present
      if (!categories.includes(selectedCategory)) {
        categories.push(selectedCategory);
      }

      if (editingPostId) {
        // --- EDIT MODE ---
        const postIndex = posts.findIndex((p) => p.id === editingPostId);
        if (postIndex !== -1) {
          posts[postIndex].title = title;
          posts[postIndex].description = description;
          posts[postIndex].category = selectedCategory;
          if (uploadedDataUrl) {
            posts[postIndex].url = uploadedDataUrl;
          }
        }

        // IMPORTANT FIX: Reset filter to "All" and clear search so no images disappear
        activeFilter = "All";
        searchQuery = "";
        searchInput.value = "";

        saveStateToStorage();
        renderFilterButtons();
        renderGallery();
        closePostModal();
        showToast(`Post updated! Category changed to ${selectedCategory}`);
      } else {
        // --- UPLOAD MODE ---
        if (!uploadedDataUrl) {
          showToast("Please select an image to upload!");
          return;
        }

        const todayStr = new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric"
        });

        const newPost = {
          id: "user-" + Date.now(),
          title: title,
          description: description,
          category: selectedCategory,
          url: uploadedDataUrl,
          photographer: "You (Community)",
          dateAdded: todayStr,
          timestamp: Date.now(),
          likes: 1,
          favourited: false,
          comments: []
        };

        // Prepend new post so it appears on top of the gallery
        posts.unshift(newPost);

        // IMPORTANT FIX: Reset filter to "All" and clear search so no images disappear
        activeFilter = "All";
        searchQuery = "";
        searchInput.value = "";

        saveStateToStorage();
        renderFilterButtons();
        renderGallery();
        closePostModal();
        showToast("Image uploaded with caption!");
      }
    });

    document.getElementById("openUploadBtn").addEventListener("click", openUploadModal);
    document.getElementById("closeModalBtn").addEventListener("click", closePostModal);
    document.getElementById("cancelModalBtn").addEventListener("click", closePostModal);

    // Close modal when clicking outside the modal card
    postModal.addEventListener("click", (e) => {
      if (e.target === postModal) closePostModal();
    });

    /* ------------------------------------------------------------------------
       I. DELETE POST (USING CONFIRM() & ARRAY SPLICE())
       ------------------------------------------------------------------------ */
    function deletePost(postId) {
      const index = posts.findIndex((p) => p.id === postId);
      if (index === -1) return;

      const postTitle = posts[index].title;
      const confirmed = confirm(`Are you sure you want to delete "${postTitle}"?`);

      if (confirmed) {
        posts.splice(index, 1); // Remove item using splice()
        saveStateToStorage();
        renderGallery();
        showToast("Post deleted");
      }
    }

    /* ------------------------------------------------------------------------
       J. FULL-SCREEN LIGHTBOX (ZOOM, NAVIGATION, SLIDESHOW, SHARE, COMMENTS)
       ------------------------------------------------------------------------ */
    function openLightbox(index) {
      currentLightboxIndex = index;
      resetZoom();
      updateLightboxUI();
      lightbox.classList.add("active");
      document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
      stopSlideshow();
      lightbox.classList.remove("active");
      document.body.style.overflow = "";
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
    }

    function updateLightboxUI() {
      if (filteredPosts.length === 0) return;
      const post = filteredPosts[currentLightboxIndex];

      lbCounter.textContent = `${currentLightboxIndex + 1} / ${filteredPosts.length}`;
      lbImage.src = post.url;
      lbImage.alt = post.title;
      lbTitle.textContent = post.title;
      lbDescription.textContent = post.description;
      lbCategory.textContent = post.category;
      lbDate.textContent = post.dateAdded || "Nov 21, 2026";
      lbPhotographer.textContent = post.photographer || "Featured Artist";
      lbLikes.textContent = `❤️ ${post.likes}`;

      renderComments(post);
    }

    function nextLightboxImage() {
      if (filteredPosts.length === 0) return;
      currentLightboxIndex = (currentLightboxIndex + 1) % filteredPosts.length;
      resetZoom();
      updateLightboxUI();
    }

    function prevLightboxImage() {
      if (filteredPosts.length === 0) return;
      currentLightboxIndex =
        (currentLightboxIndex - 1 + filteredPosts.length) % filteredPosts.length;
      resetZoom();
      updateLightboxUI();
    }

    // Zoom Controls (Buttons + Mouse Wheel clamped between 0.5 and 2.5)
    function setZoom(newZoom) {
      currentZoom = Math.min(2.5, Math.max(0.5, Number(newZoom.toFixed(2))));
      lbImage.style.transform = `scale(${currentZoom})`;
    }

    function resetZoom() {
      setZoom(1);
    }

    document.getElementById("lbZoomInBtn").addEventListener("click", () => setZoom(currentZoom + 0.25));
    document.getElementById("lbZoomOutBtn").addEventListener("click", () => setZoom(currentZoom - 0.25));
    document.getElementById("lbResetZoomBtn").addEventListener("click", resetZoom);

    lbStage.addEventListener(
      "wheel",
      (e) => {
        e.preventDefault();
        const delta = e.deltaY < 0 ? 0.15 : -0.15;
        setZoom(currentZoom + delta);
      },
      { passive: false }
    );

    // Slideshow Play / Pause (Auto-changes every 3 seconds)
    function stopSlideshow() {
      if (slideshowTimer) {
        clearInterval(slideshowTimer);
        slideshowTimer = null;
      }
      lbSlideshowBtn.textContent = "▶️ Slideshow";
      lbSlideshowBtn.classList.remove("playing");
    }

    lbSlideshowBtn.addEventListener("click", () => {
      if (slideshowTimer) {
        stopSlideshow();
      } else {
        lbSlideshowBtn.textContent = "⏸️ Pause";
        lbSlideshowBtn.classList.add("playing");
        slideshowTimer = setInterval(nextLightboxImage, 3000);
      }
    });

    // Download Currently Viewing Image
    document.getElementById("lbDownloadBtn").addEventListener("click", async () => {
      const post = filteredPosts[currentLightboxIndex];
      if (!post) return;

      const safeFilename = post.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") + ".jpg";

      try {
        // Fetch blob so cross-origin picsum images download directly instead of opening a tab
        const response = await fetch(post.url);
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = safeFilename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl);
      } catch (err) {
        // Direct anchor fallback (works natively for Data URLs)
        const link = document.createElement("a");
        link.href = post.url;
        link.download = safeFilename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    });

    // Share Button (Copies link to Clipboard & shows toast)
    document.getElementById("lbShareBtn").addEventListener("click", async () => {
      const post = filteredPosts[currentLightboxIndex];
      if (!post) return;

      const shareUrl = post.url.startsWith("data:") ? window.location.href : post.url;

      try {
        await navigator.clipboard.writeText(shareUrl);
        showToast("Link copied!");
      } catch (err) {
        // Fallback copy method
        const tempInput = document.createElement("input");
        tempInput.value = shareUrl;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);
        showToast("Link copied!");
      }
    });

    // Fullscreen Button
    document.getElementById("lbFullscreenBtn").addEventListener("click", () => {
      if (!document.fullscreenElement) {
        lightbox.requestFullscreen().catch(() => {
          showToast("Fullscreen unavailable in this browser");
        });
      } else {
        document.exitFullscreen().catch(() => {});
      }
    });

    // Lightbox Navigation & Keyboard Support
    document.getElementById("lbNextBtn").addEventListener("click", nextLightboxImage);
    document.getElementById("lbPrevBtn").addEventListener("click", prevLightboxImage);
    document.getElementById("lbCloseBtn").addEventListener("click", closeLightbox);

    document.addEventListener("keydown", (e) => {
      if (!lightbox.classList.contains("active")) return;
      if (document.activeElement === commentInput) return; // Don't hijack typing in comment box

      if (e.key === "ArrowRight") nextLightboxImage();
      if (e.key === "ArrowLeft") prevLightboxImage();
      if (e.key === "Escape") closeLightbox();
    });

    /* ------------------------------------------------------------------------
       K. COMMENTS SYSTEM INSIDE LIGHTBOX (SAVED PER IMAGE IN LOCALSTORAGE)
       ------------------------------------------------------------------------ */
    function renderComments(post) {
      commentsList.innerHTML = "";
      const comments = post.comments || [];

      if (comments.length === 0) {
        commentsList.innerHTML = `<p class="no-comments">No comments yet. Be first!</p>`;
        return;
      }

      comments.forEach((c) => {
        const item = document.createElement("div");
        item.className = "comment-item";
        item.innerHTML = `
          <div class="comment-meta">
            <strong>Visitor</strong>
            <span>${escapeHTML(c.time)}</span>
          </div>
          <div>${escapeHTML(c.text)}</div>
        `;
        commentsList.appendChild(item);
      });
    }

    commentForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const text = commentInput.value.trim();
      if (!text) return;

      const post = filteredPosts[currentLightboxIndex];
      if (!post) return;

      if (!post.comments) post.comments = [];
      post.comments.unshift({
        text: text,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      });

      commentInput.value = "";
      saveStateToStorage();
      renderComments(post);
      showToast("Comment posted!");
    });

    /* ------------------------------------------------------------------------
       L. INITIALIZE APPLICATION ON PAGE LOAD
       ------------------------------------------------------------------------ */
    initThemeAndStyle();
    renderFilterButtons();
    renderGallery();