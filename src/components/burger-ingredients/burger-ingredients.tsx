import { useState, useEffect, useCallback } from "react";
import ingrediensStyles from "./burger-ingredients.module.css";
import { categories } from "../../utils/product-types";
import IngredientsNavigation from "../ingredients-navigation/ingredients-navigation";
import IngredientsList from "../ingredients-list/ingredients-list";
import { useInView } from "react-intersection-observer";
import React, { FC, DetailedHTMLProps, HTMLAttributes } from "react";
import { useAppDispatch, useAppSelector } from "../../services/store";

interface IBurgerIngredients
  extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {}

const BurgerIngredients: FC<IBurgerIngredients> = () => {
  const { ingredientsArray } = useAppSelector((store) => store.ingredients);
  const buns = ingredientsArray.filter(
    (ingredient) => ingredient.type === categories.Bun.type
  );
  const fixings = ingredientsArray.filter(
    (ingredient) => ingredient.type === categories.Main.type
  );
  const sauces = ingredientsArray.filter(
    (ingredient) => ingredient.type === categories.Sauce.type
  );

  const [currentTab, setCurrentTab] = useState("bun");

  const [bunsRef, inViewBuns] = useInView({ threshold: 0.6 });
  const [saucesRef, inViewSauces] = useInView({ threshold: 0.1 });
  const [fixingsRef, inViewFixings] = useInView({ threshold: 0.1 });

  useEffect(() => {
    if (inViewBuns) {
      setCurrentTab("bun");
    } else if (inViewSauces) {
      setCurrentTab("sauce");
    } else if (inViewFixings) {
      setCurrentTab("main");
    }
  }, [inViewBuns, inViewSauces, inViewFixings]);

  const switchTab = useCallback(
    (type: string) => {
      setCurrentTab(type);
      document.getElementById(type)?.scrollIntoView({ behavior: "smooth" });
    },
    [currentTab]
  );

  return (
    <section className={`${ingrediensStyles.options} pt-10`}>
      <h1 className="text text_type_main-large pb-5">Соберите бургер</h1>
      <IngredientsNavigation
        tabs={[categories.Bun, categories.Sauce, categories.Main]}
        current={currentTab}
        handleClick={switchTab}
      />
      <div className={`${ingrediensStyles.ingrediens} mt-10`}>
        <IngredientsList
          itemsArr={buns}
          itemType={categories.Bun}
          ref={bunsRef}
        />
        <IngredientsList
          itemsArr={sauces}
          itemType={categories.Sauce}
          ref={saucesRef}
        />
        <IngredientsList
          itemsArr={fixings}
          itemType={categories.Main}
          ref={fixingsRef}
        />
      </div>
    </section>
  );
};

export default BurgerIngredients;
