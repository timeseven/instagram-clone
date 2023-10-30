import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { User } from "../utils/interface";
import { useNavigate } from "react-router-dom";
import { setIsSearchGlobalFalse } from "../redux/features/globalStateSlice";
import { AiOutlineSearch } from "react-icons/ai";
import useDebounce from "../hooks/useDebounce";
import { resetUser, searchUser } from "../redux/features/userSlice";

const Search: React.FC = () => {
  const { isSearchGlobal } = useSelector((state: RootState) => state.globalState);
  const { users } = useSelector((state: RootState) => state.user);
  const { user } = useSelector((state: RootState) => state.auth);

  const [searchResult, setSearchResult] = useState<User[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const debouncedValue = useDebounce(searchValue, 500);
  const handleRedirect = (username: string) => {
    navigate(`/${username}`);
    dispatch(setIsSearchGlobalFalse());
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    if (!e.target.value) {
      dispatch(resetUser());
    }
  };

  const handleClearSearch = () => {
    dispatch(resetUser());
    setSearchValue("");
    setSearchResult([]);
  };

  useEffect(() => {
    setSearchResult(users!.filter((item) => item._id !== user!._id));
  }, [users, user]);

  useEffect(() => {
    if (!isSearchGlobal) {
      handleClearSearch();
    }
  }, [isSearchGlobal]);

  useEffect(() => {
    if (!debouncedValue.trim()) {
      return;
    }
    const fetchSearch = async () => {
      await dispatch(searchUser(debouncedValue));
    };
    fetchSearch();
  }, [dispatch, debouncedValue]);
  return (
    <>
      <div
        className={`fixed top-[58px] left-[calc(((100vw-375px)/2)+((100vw-375px)/3))] z-40 bg-white rounded-md 
                    transition-[height] duration-300 tablet:transition-[width,left] tablet:duration-300
                    ${
                      isSearchGlobal
                        ? "w-[375px] h-[60vh] desktop:left-[72px] desktop-lg:left-[72px] shadow-[0_0_6px_4px_rgba(0,0,0,0.1)] tablet:shadow-[2px_0_4px_2px_rgba(0,0,0,0.1)] "
                        : "w-0 h-0 desktop:left-[245px] desktop-lg:left-[335px]"
                    } tablet:h-screen tablet:left-[72px] tablet:top-0 tablet:rounded-none tablet:rounded-r-2xl`}
      >
        {isSearchGlobal && (
          <div className="flex flex-col h-full">
            <div className="-z-10 relative tablet:hidden">
              <span className="absolute left-1/2 -top-2 bg-white border w-[30px] h-[30px] search-input-angle px-4"></span>
            </div>
            <div className="w-full p-2 mt-10 px-6 mx-auto relative hidden tablet:inline-block">
              <input
                placeholder="Search"
                className="w-full h-[36px] pl-10 peer focus:pl-3 bg-neutral-200 rounded-lg"
                value={searchValue}
                onChange={handleSearchChange}
              />
              <AiOutlineSearch className="absolute top-[15px] peer-focus:hidden left-8 w-6 h-6 group-focus:hidden fill-neutral-400" />
            </div>
            <div className="flex flex-col overflow-y-auto">
              {searchResult.length > 0 &&
                searchResult.map((item) => (
                  <div
                    onClick={() => handleRedirect(item.username)}
                    className="h-[112px] flex p-4 cursor-pointer hover:bg-neutral-100"
                    key={item._id}
                  >
                    <div className="flex w-full">
                      <div className="max-w-[80px] max-h-[80px]">
                        <img src={item.avatar} alt="user-profile" height={80} width={80} />
                      </div>
                      <div className="flex flex-col justify-center ml-2">
                        <div className="flex items-center font-semibold grow">{item.username}</div>
                        <div className="flex items-center text-lg grow">
                          {item.fullname} · {item.followers.length} followers
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            {!searchResult.length && (
              <div className="w-full h-full flex flex-col">
                <div className="text-2xl font-semibold grow ml-2">Recent</div>
                <div className="mx-auto grow">No recent searchs</div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Search;
