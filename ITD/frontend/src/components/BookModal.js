import Modal from "antd/lib/modal/Modal";
import React, { useState } from "react";
import * as ROUTES from "./../constants/routes";
import { requestBooking } from "./../api";
import { useHistory } from "react-router";
import { DatePicker, TimePicker, message, Select } from "antd";
import moment from "moment";

const { Option } = Select;

function range(start, end) {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}

const BookModal = ({
  openModal,
  setOpenModal,
  selectedStoreId,
  setSelectedStoreId,
  availableStores,
  axios,
}) => {
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const history = useHistory();

  const handleConfirm = () => {
    if (!selectedDate || !selectedTime) {
      message.error("You have to select a date and a time!");
      return;
    }

    const date = moment(selectedDate + " " + selectedTime, "MMMM Do HH:mm");

    setLoading(true);
    requestBooking(axios, selectedStoreId, date, selectedCategories).then(
      (res) => {
        setSelectedStoreId(null);
        setOpenModal(false);
        setLoading(false);
        history.push(`${ROUTES.BOOK}/${res.ticket_id}`);
      }
    );

    // api call
  };

  const handleCancel = () => {
    setOpenModal(false);
    setSelectedStoreId(null);
  };

  const disabledDate = (current) => {
    return current && current < moment().endOf("day");
  };

  const selectedStore = availableStores.find(
    (d) => d.store_id === selectedStoreId
  );

  if (!selectedStoreId) return <div></div>;

  return (
    <Modal
      title="Confirm your booking?"
      okText={"Confirm"}
      visible={openModal}
      onOk={handleConfirm}
      confirmLoading={loading}
      onCancel={handleCancel}
    >
      {selectedStore && (
        <div>
          <h3>{selectedStore.address}</h3>

          <DatePicker
            onChange={(_, date) => setSelectedDate(date)}
            format="MMMM Do"
            disabledDate={disabledDate}
          />
          <TimePicker
            onChange={(_, time) => setSelectedTime(time)}
            showNow={false}
            format="HH:mm"
            hideDisabledOptions={true}
            disabledHours={() => range(0, 9).concat(range(21, 24))}
            minuteStep={15}
          />
          <div className={"categories"}>
            <h3>Categories to shop in (optional)</h3>
            <Select
              mode={"tags"}
              style={{ width: "100%" }}
              onChange={(d) => setSelectedCategories(d)}
            >
              {selectedStore.shopping_categories.map((d) => (
                <Option key={d}>{d}</Option>
              ))}
            </Select>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default BookModal;
