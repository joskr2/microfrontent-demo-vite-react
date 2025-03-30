
const Recommendations = () => {
  const recommendations = [
    'Intenta capturar un Pikachu.',
    'Sube de nivel a tu Bulbasaur.',
    'Explora la región de Kanto.',
  ];

  return (
    <div className="bg-blue-100 p-4 rounded-md">
      <h3 className="text-lg font-semibold mb-2">Recomendaciones:</h3>
      <ul>
        {recommendations.map((recommendation, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
<li key={index} className="list-disc ml-5">
            {recommendation}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Recommendations;
