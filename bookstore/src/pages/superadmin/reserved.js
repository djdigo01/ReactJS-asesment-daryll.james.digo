import { useEffect, useState } from "react";
import AdminLayout from "../../layout/admin";
import classes from "./reserved.module.css";
import { getReservedHttp } from "../../lib/admin";
import useHttp from "../../store/admin/use-http";
import ViewModalComponent from "../../components/admin/modal/viewModal";

const SuperAdminReservedPage = () => {
  const { sendingData, status, data } = useHttp(getReservedHttp, true);
  const [viewModal, setViewModal] = useState({
    isShow: false,
    data: null,
  });

  useEffect(() => {
    sendingData();
  }, [sendingData]);

  const viewHandler = (e) => {
    const reserved_id = e.target.dataset.id;
    const dataFilter = data.filter((val) => val._id === reserved_id);
    setViewModal({ isShow: true, data: dataFilter });
  };

  return (
    <AdminLayout
      title="RESERVED BOOKS"
      count={data !== null ? `(${data.length})` : "(0)"}
    >
      {viewModal.isShow && (
        <ViewModalComponent
          data={viewModal.data}
          page="reserved"
          onClose={(props) => setViewModal(props)}
        ></ViewModalComponent>
      )}
      <div className={classes.table}>
        <ul>
          <li>Name</li>
          <li>Contact #</li>
          <li>Email</li>
          <li>Qty</li>
          <li>Date</li>
          <li>Action</li>
        </ul>
        {status === "completed" &&
          data.map((value, key) => (
            <ul key={key}>
              <li>{value.fullname}</li>
              <li>{value.contact}</li>
              <li>{value.email}</li>
              <li>{value.qty}</li>
              <li>{value.date_created}</li>
              <li>
                <button
                  data-id={value._id}
                  onClick={viewHandler}
                  className={classes.view}
                >
                  View
                </button>
                {/* <button data-id={value._id}>Returned</button> */}
              </li>
            </ul>
          ))}
      </div>
    </AdminLayout>
  );
};

export default SuperAdminReservedPage;
