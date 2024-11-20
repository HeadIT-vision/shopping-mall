document.addEventListener("DOMContentLoaded", function() {
  const openModalBtn = document.getElementById('createCategoryModal');
  const modalContent = document.getElementById('modal-area');

  openModalBtn.onclick = function() {
    fetch('/categories/new-category')
        .then(response => response.text())
        .then(html => {
          modalContent.innerHTML = html;
          const commonModal = document.getElementById('modal-container');

          const categoryModal = document.getElementById('category-modal');
          const closeModalBtn = document.getElementById('btn-close');
          if (commonModal) commonModal.classList.remove('hidden');

          if (closeModalBtn) {
            closeModalBtn.onclick = function () {
              commonModal.classList.add('hidden');
              resetForm();
            };
          }
        }).catch(error => console.error('모달 로딩 실패:', error));
  };

  function resetForm() {
    const categoryForm = document.getElementById('category-form');
    if (categoryForm) {
      categoryForm.reset();
    }
  }
});