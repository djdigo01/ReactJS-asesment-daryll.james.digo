import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SendingRequestActions } from "./admin";

const useHttp = (requestFunction, initialSend = false) => {
  const insertData = useSelector((state) => state);
  const dispatch = useDispatch();

  const sendingData = useCallback(
    async (data) => {
      dispatch(SendingRequestActions.send(initialSend));
      try {
        const result = await requestFunction(data);
        dispatch(SendingRequestActions.success(result));
      } catch (error) {
        dispatch(SendingRequestActions.error(error));
      }
    },
    [requestFunction, dispatch, initialSend]
  );
  return { sendingData, ...insertData };
};

export default useHttp;
