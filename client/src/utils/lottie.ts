export const removeLottieWatermark = (id: string, matrix: string) => {
  const targetTransform = matrix;
  const lottieDom = document.getElementById(id);
  if (!lottieDom) return;
  const allGroups = lottieDom.querySelectorAll(`svg g g`);
  const domElement = Array.from(allGroups).find((g) => {
    const transform = g.getAttribute("transform");
    return (
      transform &&
      (transform.includes(matrix.slice(0, 15)) || transform === targetTransform)
    );
  });
  if (domElement) {
    (domElement as HTMLElement).style.display = "none !important";
    console.log("Lottie watermark removed");
  }
};
