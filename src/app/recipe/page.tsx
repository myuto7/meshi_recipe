import styles from "../page.module.css";

const getCategoryRanking = async (): Promise<RecipeData> => {
  const url = process.env.RAKUTEN_CATEGORY_RANKING_API_URL || "";
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

type RecipeData = {
  result: Result[];
};

type Result = {
  foodImageUrl: string;
  mediumImageUrl: string;
  nickname: string;
  pickup: number;
  rank: string;
  recipeCost: string;
  recipeDescription: string;
  recipeId: number;
  recipeIndication: string;
  recipeMaterial: string[];
  recipePublishday: string;
  recipeTitle: string;
  recipeUrl: string;
  shop: number;
  smallImageUrl: string;
};

export default async function Page() {
  const data = await getCategoryRanking();
  // console.log(data);

  return (
    <main className={styles.main}>
      {data.result.map((v, i) => {
        return (
          <div>
            <p key={i}>{v.recipeTitle}</p>
            <p key={i}>{v.recipeCost}</p>
            <p key={i}>{v.recipeDescription}</p>
            <a href={v.recipeUrl}>れしぴ</a>
          </div>
        );
      })}
    </main>
  );
}
