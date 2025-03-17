const MealDetailsPage = ({ params }) => {
  return (
    <>
      <h1>Meal Details Page</h1>
      <p>{params.mealSlug}</p>
    </>
  );
};

export default MealDetailsPage;