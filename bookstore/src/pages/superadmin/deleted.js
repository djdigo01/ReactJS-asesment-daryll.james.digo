import { useEffect, useState } from "react";
import AdminLayout from "../../layout/admin";
import DataListComponent from "./../../components/admin/datalist";
import { getHttp } from "../../lib/admin";
import useHttp from "../../store/admin/use-http";
import RevertConfirmationModal from "../../components/admin/modal/revertConfirmation";
import ViewModalComponent from "../../components/admin/modal/viewModal";
import SearchComponent from "./../../components/admin/search";

const SuperAdminDeletedPage = () => {
  const { sendingData, status, data } = useHttp(getHttp, true);
  const [confirmModal, setConfirmModal] = useState({
    isShow: false,
    data: null,
  });
  const [viewModal, setViewModal] = useState({
    isShow: false,
    data: null,
  });
  const [search, setSearch] = useState("");


  useEffect(() => {
    sendingData();
  }, [sendingData]);

  let filteredData = [];
  if (status === "completed") {
    const filter = data.filter((value) => value.isDeleted === 1);
    filteredData.push(...filter);
  }

  const searchHandler = (props) => {
    setSearch(props)
  };

  return (
    <AdminLayout title="DELETED BOOKS" count={filteredData ? `(${filteredData.length})` : "(0)"}>
      {confirmModal.isShow && (
        <RevertConfirmationModal
          onClose={(props) => setConfirmModal(props)}
          data={confirmModal.data}
        ></RevertConfirmationModal>
      )}
      {viewModal.isShow && (
        <ViewModalComponent
          data={viewModal.data}
          onClose={(props) => setViewModal(props)}
          page="deleted"
        ></ViewModalComponent>
      )}
      <SearchComponent onSearch={searchHandler}></SearchComponent>
      <DataListComponent
        search={search}
        data={filteredData}
        onRemove={(props) => setConfirmModal(props)}
        onView={(props) => setViewModal(props)}
        page="deleted"
      ></DataListComponent>
    </AdminLayout>
  );
};

export default SuperAdminDeletedPage;
