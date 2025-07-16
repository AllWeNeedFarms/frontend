import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PlaceList from "../components/PlaceList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";

// 메인 화면 USER 목록 클릭 후 -> 그에 해당하는 farm에 대한 정보
// 이 부분은 앞으로 굳이 필요 없을 듯
// farms 에 대한 정보와 farms/fid 정도
const UserPlaces = () => {
  const [loadedPlaces, setLoadedPlaces] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const userId = useParams().userId;

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/farms/user/${userId}`
        );
        setLoadedPlaces(responseData.farms);
      } catch (err) {}
    };
    fetchPlaces();
  }, [sendRequest, userId]);

  // 삭제 함수 실행
  const farmDeleteHandler = (deletedFarmId) => {
    setLoadedPlaces((prevFarms) =>
      prevFarms.filter((farm) => farm.id !== deletedFarmId)
    );
  };
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedPlaces && (
        <PlaceList items={loadedPlaces} onDeleteFarm={farmDeleteHandler} />
      )}
    </React.Fragment>
  );
};

export default UserPlaces;
