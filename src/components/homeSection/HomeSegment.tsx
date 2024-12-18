import { category, type } from "@/utils/constant";
import FilmList from "./FilmList";
import WatchNow from "./WatchNow";

const HomeSegment = () => {
  return (
    <section>
      <WatchNow />
      <FilmList
        name="Popular Movies"
        category={category.movie}
        type={type.popular}
      />
      <FilmList
        name="Top Rated Movie"
        category={category.movie}
        type={type.top_rated}
      />
      <FilmList
        name="Top Rated Tv Series"
        category={category.tv}
        type={type.top_rated}
      />
      <FilmList
        name="Popular Tv Series"
        category={category.tv}
        type={type.popular}
      />
    </section>
  );
};

export default HomeSegment;
