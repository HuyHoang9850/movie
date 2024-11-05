import { useState, useEffect } from "react";
import Header from "./components/Header";
import Banner from "./components/Banner";
import MovieList from "./components/MovieList";
import MovieSearch from "./components/MovieSearch";

function App() {
  const [movie, setMovie] = useState([]);
  const [movieRate, setMovieRate] = useState([]);
  const [movieSearch, setMovieSearch] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async (searchVal) => {
    if (searchVal.trim() === '') {
        setMovieSearch([]); // Đặt movieSearch thành rỗng để quay lại trang chủ
        return; // Không thực hiện tìm kiếm nếu input rỗng
    }

    setMovieSearch([]); // Xóa dữ liệu cũ trước khi tìm kiếm
    setSearchTerm(searchVal); // Cập nhật từ khóa tìm kiếm
    try {
        const url = `https://api.themoviedb.org/3/search/movie?query=${searchVal}&include_adult=false&language=vi&page=1`;
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
            },
        };
        const searchMovie = await fetch(url, options);

        if (!searchMovie.ok) {
            throw new Error('Lỗi khi tìm kiếm phim!');
        }
        const data = await searchMovie.json();
        setMovieSearch(data.results);  // Cập nhật `movieSearch` với kết quả mới

        if (data.results.length === 0) {
            alert("Không tìm thấy kết quả nào cho từ khóa tìm kiếm.");
        }
    } catch (error) {
        console.log("Error fetching search results:", error);
        alert("Có lỗi xảy ra khi tìm kiếm. Vui lòng thử lại sau.");
    }
};
  useEffect(() => {
    const fetchMovie = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        },
      };
      const url1 = 'https://api.themoviedb.org/3/movie/popular?language=vi&page=1';
      const url2 = 'https://api.themoviedb.org/3/movie/top_rated?language=vi&page=1';

      const [res1, res2] = await Promise.all([
        fetch(url1, options),
        fetch(url2, options),
      ]);

      const data1 = await res1.json();
      const data2 = await res2.json();

      setMovie(data1.results);
      setMovieRate(data2.results);
    };

    fetchMovie();
  }, []);

  return (
    <div className="bg-black pb-10">
      <Header onSearch={handleSearch} />  {/* Truyền `handleSearch` vào `Header` */}
      <Banner />
      {movieSearch.length > 0 ? (
        <MovieSearch title="Kết quả tìm kiếm" data={movieSearch} />
      ) : (
        <>
          {searchTerm && movieSearch.length === 0 && ( // Hiển thị thông báo nếu không có kết quả tìm kiếm
            <p className="text-white text-center p-5">Không tìm thấy kết quả nào phù hợp cho từ khóa "{searchTerm}".</p>
          )}
          <MovieList title="Phim Hot" data={movie} />
          <MovieList title="Phim Đề Cử" data={movieRate} />
        </>
      )}
    </div>
  );
}

export default App;
