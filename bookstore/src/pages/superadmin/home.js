import { useEffect, useState } from "react";
import { getHttp } from "../../lib/admin";
import useHttp from "../../store/admin/use-http";
import AdminLayout from "../../layout/admin";
import DataListComponent from "./../../components/admin/datalist";
import SearchComponent from "./../../components/admin/search";
import EditBooksModal from "../../components/admin/modal/edit";
import ConfirmationModal from "../../components/admin/modal/deleteConfirmation";
import ViewModalComponent from "../../components/admin/modal/viewModal";

const SuperAdminHomePage = () => {
  const { sendingData, status, data } = useHttp(getHttp, true);
  const [editModal, setEditModal] = useState({
    isShow: false,
    data: null,
  });
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
  }, [sendingData, editModal.data, confirmModal]);

  let filteredData = [];
  if (status === "completed") {
    const filter = data.filter((v) => v.isDeleted === 0);
    filteredData.push(...filter);
  }

  const searchHandler = (props) => {
    setSearch(props)
  };

  return (
    <AdminLayout title="LIST OF BOOKS" count={filteredData ? `(${filteredData.length})` : "(0)"}>
      {confirmModal.isShow && (
        <ConfirmationModal
          onClose={(props) => setConfirmModal(props)}
          data={confirmModal.data}
        ></ConfirmationModal>
      )}
      {editModal.isShow && (
        <EditBooksModal
          data={editModal.data}
          onClose={(props) => setEditModal(props)}
        ></EditBooksModal>
      )}
      {viewModal.isShow && (
        <ViewModalComponent
          data={viewModal.data}
          onClose={(props) => setViewModal(props)}
          page="home"
        ></ViewModalComponent>
      )}

      <SearchComponent onSearch={searchHandler}></SearchComponent>

      <DataListComponent
        search={search}
        data={filteredData}
        onEdit={(props) => setEditModal(props)}
        onRemove={(props) => setConfirmModal(props)}
        onView={(props) => setViewModal(props)}
      ></DataListComponent>
    </AdminLayout>
  );
};

export default SuperAdminHomePage;
