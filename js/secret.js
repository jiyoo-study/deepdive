document.addEventListener('DOMContentLoaded', () => {
  const imageFolder = '../asset/random/'; // 실제 경로에 맞게 수정
  const imageFiles = [
        'img1.jpeg',
        'img2.jpeg',
        'img3.jpeg',
        'img4.jpeg',
        'img5.jpeg',
        'img6.jpeg',
        'img7.jpeg',
        'img8.jpeg'
  ];

  // 배열의 순서를 무작위로 섞는 Fisher-Yates 셔플 알고리즘
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    // 이미지 배열을 무작위로 섞습니다.
    const shuffledImageFiles = shuffleArray([...imageFiles]);

    const imageElements = document.querySelectorAll('.random-image');

    imageElements.forEach((imgElement, index) => {
        // 섞인 배열에서 인덱스 순서대로 이미지를 가져옵니다.
        const randomImageSrc = imageFolder + shuffledImageFiles[index % shuffledImageFiles.length];
        imgElement.src = randomImageSrc;
    });
});