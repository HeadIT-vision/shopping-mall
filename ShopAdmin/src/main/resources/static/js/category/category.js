document.addEventListener("DOMContentLoaded", function() {
  const openModalBtn = document.getElementById('create-category');
  const modalContent = document.getElementById('modal-area');
  openModalBtn.onclick = function() {
    fetch('/categories/new-category')
        .then(response => response.text())
        .then(html => {
          modalContent.innerHTML = html;
          const commonModal = document.getElementById('modal-container');
          const errorDiv = document.getElementById('category-name-error');
          const closeModalBtn = document.getElementById('btn-close');
          const saveModalBtn = document.getElementById('btn-save');

          if (commonModal) commonModal.classList.remove('hidden');

          // 모달 닫기 버튼 이벤트
          if (closeModalBtn) {
            closeModalBtn.onclick = function () {
              commonModal.classList.add('hidden');
              resetForm();
            };
          }

          // 저장 버튼 클릭 시 중복 검사 후 폼 제출
          if (saveModalBtn) {
            saveModalBtn.onclick = function (event) {
              event.preventDefault(); // 기본 폼 제출 방지

              const categoryInput = document.getElementById('categoryName');
              const categoryName = categoryInput.value;

              // 폼 데이터를 담을 객체 생성
              const formData = new FormData();
              formData.append("categoryName", categoryName);

              // 폼을 바로 전송, 중복 체크 후 처리
              submitForm(formData, errorDiv, categoryInput);
            };
          }
        })
        .catch(error => console.error('모달 로딩 실패:', error));
  };


  function resetForm() {
    const categoryForm = document.getElementById('category-form');
    if (categoryForm) {
      categoryForm.reset();
    }
  }

  function submitForm(formData, errorDiv, categoryInput, categoryId) {
    const url = categoryId ? `/categories/update-category/${categoryId}` : '/categories/new-category';
    fetch(url, {
      method: 'POST',
      body: formData
    })
        .then(response => {
          if (response.ok) {
            // 성공적인 카테고리 생성 시 리다이렉트 처리
            window.location.href = response.headers.get('Location'); // 리다이렉트 URL 처리
          } else  {
            response.json().then(data => {
              errorDiv.textContent = data.message; // 에러 메시지 설정
              errorDiv.classList.remove('hidden');
              categoryInput.classList.add('border-red');
            });
          }
        })
        .catch(error => {
          console.error('폼 제출 오류: ', error);
        });
  }

  function closeModal() {
    const commonModal = document.getElementById('modal-container');
    if (commonModal) commonModal.classList.add('hidden');
  }

  const editButtons = document.querySelectorAll('#btn-edit');

  editButtons.forEach(button => {
    button.onclick = function() {
      const categoryId = button.getAttribute('data');
      fetch(`/categories/update-category/${categoryId}`)
          .then(response => response.text())  // 텍스트 응답을 받음
          .then(html => {
            // 받아온 HTML을 모달 영역에 삽입
            modalContent.innerHTML = html;

            const commonModal = document.getElementById('modal-container');
            const errorDiv = document.getElementById('category-name-error');
            const closeModalBtn = document.getElementById('btn-close');
            const saveModalBtn = document.getElementById('btn-save');

            if (commonModal) commonModal.classList.remove('hidden');

            // 모달 닫기 버튼 이벤트
            if (closeModalBtn) {
              closeModalBtn.onclick = function () {
                commonModal.classList.add('hidden');
                resetForm();
              };
            }

            if (saveModalBtn) {
              saveModalBtn.onclick = function(event) {
                event.preventDefault();  // 기본 폼 제출 방지
                const categoryForm = document.getElementById('category-form');
                const formData = new FormData(categoryForm);

                const categoryInput = document.getElementById('categoryName');
                const categoryName = categoryInput.value;
                // 서버로 폼 제출
                submitForm(formData, errorDiv, categoryInput, categoryId);
              };
            }

          })
          .catch(error => console.error('수정 화면 로드 실패:', error));
    };
  });

});
