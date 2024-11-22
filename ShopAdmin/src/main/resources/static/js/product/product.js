document.addEventListener('DOMContentLoaded', function () {
  const thumbnailUploadArea = document.getElementById('thumbnail-upload-area');
  const thumbnailInput = document.getElementById('thumbnailImage');
  const thumbnailPreview = document.getElementById('thumbnail-preview');
  const thumbnailText = document.getElementById('thumbnail-upload-text');

  const detailUploadArea = document.getElementById('detail-upload-area');
  const detailInput = document.getElementById('detailImage');
  const detailPreview = document.getElementById('detail-preview');
  const detailText = document.getElementById('detail-upload-text');

  if (thumbnailUploadArea && thumbnailInput && thumbnailPreview && thumbnailText) {
    setupImageUpload(
        thumbnailUploadArea,
        thumbnailInput,
        thumbnailPreview,
        thumbnailText
    );
  } else {
    console.warn('썸네일 업로드 관련 요소가 없습니다.');
  }

  if (detailUploadArea && detailInput && detailPreview && detailText) {
    setupImageUpload(
        detailUploadArea,
        detailInput,
        detailPreview,
        detailText
    );
  } else {
    console.warn('상세 이미지 업로드 관련 요소가 없습니다.');
  }
});

/**
 * 이미지 업로드 영역 초기화
 * @param {HTMLElement} uploadArea - 업로드 영역 요소
 * @param {HTMLInputElement} input - 파일 입력 요소
 * @param {HTMLImageElement} preview - 이미지 미리보기 요소
 * @param {HTMLElement} text - 업로드 텍스트 요소
 */
function setupImageUpload(uploadArea, input, preview, text) {
  // 파일 선택 클릭 처리
  uploadArea.addEventListener('click', () => input.click());

  // 파일 선택 후 미리보기 처리
  input.addEventListener('change', (event) =>
      handleFileSelect(event, preview, text)
  );

  // 드래그 앤 드롭 처리
  setupDragAndDrop(uploadArea, (file) =>
      handleFilePreview(file, preview, text)
  );
}

/**
 * 파일 선택 후 미리보기 처리
 * @param {Event} event - 파일 선택 이벤트
 * @param {HTMLImageElement} previewElement - 이미지 미리보기 요소
 * @param {HTMLElement} textElement - 업로드 텍스트 요소
 */
function handleFileSelect(event, previewElement, textElement) {
  const file = event.target.files[0];
  if (file && file.type.startsWith('image/')) {
    handleFilePreview(file, previewElement, textElement);
  } else {
    alert('이미지 파일만 선택 가능합니다.');
  }
}

/**
 * 파일을 미리보기로 표시
 * @param {File} file - 선택된 파일
 * @param {HTMLImageElement} previewElement - 이미지 미리보기 요소
 * @param {HTMLElement} textElement - 업로드 텍스트 요소
 */
function handleFilePreview(file, previewElement, textElement) {
  const reader = new FileReader();
  reader.onload = (e) => {
    previewElement.src = e.target.result;
    previewElement.classList.remove('hidden'); // 미리보기 표시
    textElement.classList.add('hidden'); // "사진 첨부하기" 텍스트 숨기기
  };
  reader.readAsDataURL(file);
}

/**
 * 드래그 앤 드롭 영역 설정
 * @param {HTMLElement} uploadArea - 업로드 영역 요소
 * @param {Function} onFileDrop - 파일 드롭 처리 함수
 */
function setupDragAndDrop(uploadArea, onFileDrop) {
  uploadArea.addEventListener('dragover', (event) => {
    event.preventDefault();
    uploadArea.classList.add('bg-orange-100'); // 드래그 오버 시 배경 색상 변경
  });

  uploadArea.addEventListener('dragleave', () =>
      uploadArea.classList.remove('bg-orange-100')
  );

  uploadArea.addEventListener('drop', (event) => {
    event.preventDefault();
    uploadArea.classList.remove('bg-orange-100');
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      onFileDrop(file);
    } else {
      alert('이미지 파일만 선택 가능합니다.');
    }
  });
}
