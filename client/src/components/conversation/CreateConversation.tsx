import React, { KeyboardEvent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { AiOutlineClose } from "react-icons/ai";
import { setIsCreateConversationGlobalFalse } from "../../redux/features/globalStateSlice";
import { IUserInfo } from "../../utils/interface";
import useDebounce from "../../hooks/useDebounce";
import userService from "../../services/userServices";
import { createConversation } from "../../redux/features/conversationSlice";
import { useNavigate } from "react-router-dom";

const CreateConversation: React.FC = () => {
  const { isCreateConversationGlobal } = useSelector((state: RootState) => state.globalState);
  const { user } = useSelector((state: RootState) => state.auth);

  const [searchValue, setSearchValue] = useState<string>("");
  const [searchResult, setSearchResult] = useState<IUserInfo[]>([]);
  const [resultValue, setResultValue] = useState<IUserInfo[]>([]);
  const [resultId, setResultId] = useState<string[]>([]);

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const debouncedValue = useDebounce(searchValue, 500);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!debouncedValue.trim()) {
      setSearchResult([]);
      return;
    }

    const fetchAPI = async () => {
      const result = await userService.searchUser(debouncedValue);
      setSearchResult(result.filter((filterUser: IUserInfo) => filterUser._id !== user?._id));
    };

    fetchAPI();
  }, [debouncedValue, user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    if (!searchValue.startsWith(" ")) {
      setSearchValue(e.target.value);
    } else {
      setSearchValue("");
    }
  };
  const handleCreateConversation = async () => {
    if (resultValue.length === 1) {
      await dispatch(createConversation(resultValue[0]?._id)).then((response) => {
        navigate(`/direct/${response.payload._id}`);
      });
    }
    if (resultValue.length > 1) {
      // handle multi user conversation
    }

    dispatch(setIsCreateConversationGlobalFalse());
    setResultValue([]);
    setResultId([]);
    setSearchValue("");
  };

  const handleClose = () => {
    dispatch(setIsCreateConversationGlobalFalse());
    setResultValue([]);
    setResultId([]);
    setSearchValue("");
  };

  const handleUser = (data: IUserInfo) => {
    let result: IUserInfo[] = [];
    let tempId: string[] = [];
    if (!resultId.includes(data._id)) {
      result.push(...resultValue);
      tempId.push(...resultId);
      result.push(data);
      tempId.push(data._id);
    } else {
      result = resultValue.filter((item) => item._id !== data._id);
      tempId = resultId.filter((id) => id !== data._id);
    }
    setResultValue(result);
    setResultId(tempId);
  };
  const deleteUser = (id: string) => {
    let result: IUserInfo[] = [];
    let tempId: string[] = [];
    result = resultValue.filter((item) => item._id !== id);
    tempId = resultId.filter((uId) => uId !== id);
    setResultValue(result);
    setResultId(tempId);
  };

  const handleKeyDown = async (event: KeyboardEvent<HTMLFormElement>) => {
    let result: IUserInfo[] = [];
    let tempId: string[] = [];
    if (event.key === "Backspace" && resultValue.length > 0 && searchValue === "") {
      event.preventDefault();
      result = resultValue.filter((item, index) => index !== resultValue.length - 1);
      tempId = resultId.filter((uId, idx) => idx !== resultId.length - 1);
      setResultValue(result);
      setResultId(tempId);
    }
  };

  return (
    <>
      {isCreateConversationGlobal && (
        <div className="fixed flex items-center justify-center top-0 left-0 w-full h-screen overflow-auto bg-black bg-opacity-50 z-30">
          <div className="w-[30rem] h-[37rem] bg-white rounded-lg">
            <div className="flex w-full h-14 relative border rounded-t-lg">
              <button onClick={handleClose} title="Close" className="absolute top-4 right-3">
                <AiOutlineClose className="w-6 h-6" />
              </button>
              <div className="w-full flex items-center justify-center font-semibold">New message</div>
            </div>
            <div className="flex items-center w-full h-10 border-b">
              <div className="mx-2 font-semibold">To:</div>
              {resultValue.length > 0 &&
                resultValue.map((item) => (
                  <div className="flex items-center bg-sky-200 rounded-lg px-2 mr-2 cursor-pointer" key={item._id}>
                    <div className="text-sky-600 font-semibold">{item.username}</div>
                    <div className="text-sky-600 font-semibold pl-1" onClick={() => deleteUser(item._id)}>
                      <AiOutlineClose />
                    </div>
                  </div>
                ))}

              <form onKeyDown={handleKeyDown} className="w-full mr-2">
                <input
                  className="w-full focus:outline-none"
                  ref={inputRef}
                  type="text"
                  autoComplete="off"
                  spellCheck={false}
                  placeholder="Search..."
                  value={searchValue}
                  onChange={handleChange}
                />
              </form>
            </div>
            <div className="flex flex-col w-full h-[25rem] mt-4 overflow-y-scroll">
              {searchResult.length > 0 ? (
                <>
                  {searchValue &&
                    searchResult.map((user) => (
                      <button
                        className="flex items-center w-full relative py-2 px-4 hover:bg-neutral-100"
                        key={user._id}
                        onClick={() => handleUser(user)}
                      >
                        <div className="w-14 h-14 mr-4">
                          <img src={user.avatar} alt={user.avatar} />
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-start justify-start">{user.username}</div>
                          <div className="flex items-start justify-start text-neutral-400">{user.fullname}</div>
                        </div>
                        <div className="flex items-center justify-center ml-auto">
                          <input
                            type="checkbox"
                            checked={!!resultId.includes(user._id)}
                            onChange={() => handleUser(user)}
                            className="flex items-start justify-start w-7 h-7 round-checkbox checked:bg-sky-600 checked:[appearance:auto] appearance-none border border-neutral-300 rounded-full cursor-pointer"
                          />
                        </div>
                      </button>
                    ))}
                </>
              ) : (
                <div className="text-neutral-500 px-5">No user found!</div>
              )}
            </div>
            <div className="flex m-4">
              <button
                disabled={resultValue.length === 0}
                onClick={handleCreateConversation}
                className={`${
                  resultValue.length === 0 ? "bg-sky-300" : "bg-sky-500"
                } w-[28rem] h-[3rem] text-sm font-semibold text-white border border-none rounded-lg`}
              >
                Send Messages
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateConversation;
