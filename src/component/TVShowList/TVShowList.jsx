import { TVShowListItem } from "../TVShowListItem/TVShowListItem";
import s from "./style.module.css";
export function TVShowList({ TVShowList, onclickItem }) {
  return (
    <>
      <div className={s.title}>You may like</div>
      <div className={s.list}>
        {TVShowList.map((tvShow) => {
          return (
            <>
              <span key={tvShow.id} className={s.item}>
                <TVShowListItem onClick={onclickItem} tvShow={tvShow} />
              </span>
            </>
          );
        })}
      </div>
    </>
  );
}
