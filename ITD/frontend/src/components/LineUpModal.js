import Modal from "antd/lib/modal/Modal";
import React, { useState, useEffect } from "react";
import * as ROUTES from "./../constants/routes";
import { getNextSlot, requestTicket } from "./../api";
import { useHistory } from "react-router";
import { message, Input, Checkbox } from "antd";
import moment from "moment";

const LineUpModal = ({
  openModal,
  setOpenModal,
  selectedStoreId,
  setSelectedStoreId,
  availableStores,
  currentUser,
}) => {
  const [loading, setLoading] = useState(false);
  const [nextSlotAvailable, setNextSlotAvailable] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState(() => {
    if (!currentUser || currentUser.isManager) return null;
    else return currentUser.phoneNumber;
  });
  const [noPhoneNumber, setNoPhoneNumber] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (noPhoneNumber) {
      setUserPhoneNumber("+393000000000");
    } else {
      if (!currentUser || currentUser.isManager) setUserPhoneNumber(null);
      else setUserPhoneNumber(currentUser.phoneNumber);
    }
  }, [noPhoneNumber, currentUser]);

  const handleConfirm = () => {
    if (!userPhoneNumber) {
      message.error("You must enter a phone number!");
      return;
    }

    if (nextSlotAvailable === "") {
      setSelectedStoreId(null);
      setOpenModal(false);
      return;
    }

    const pattern = new RegExp("^[+]{1}[3]{1}[9]{1}[3]{1}[-s./0-9]{9}$", "i");
    if (!userPhoneNumber.match(pattern)) {
      message.error(
        "Make sure your phone number matches the format 3xxxxxxxxx"
      );
      return;
    }

    setLoading(true);
    requestTicket(selectedStoreId, userPhoneNumber)
      .then((res) => {
        setSelectedStoreId(null);
        setOpenModal(false);
        setLoading(false);
        history.push(`${ROUTES.LINEUP}/${res.data.ticket_id}`);
      })
      .catch((err) => {
        if (err.response) {
          console.log("err", err.response);
          if (err.response.data.message)
            message.error(err.response.data.message);
          else message.error("Unexpected error");
        }
        setLoading(false);
      });
  };

  const handleCancel = () => {
    setOpenModal(false);
    setSelectedStoreId(null);
  };

  const selectedStore = availableStores.find(
    (d) => d.store_id === selectedStoreId
  );

  useEffect(() => {
    const loadNextAvailableSlot = async (selectedStoreId) => {
      const date = moment(new Date());
      // set minutes and seconds to closest tenth and 0
      date.set({ second: 0, minute: Math.floor(date.minute() / 30) * 30 });
      getNextSlot(selectedStoreId, date)
        .then((res) => {
          setNextSlotAvailable(res.data.available_slot);
        })
        .catch((err) => console.log);
    };

    if (selectedStoreId) loadNextAvailableSlot(selectedStoreId);
  }, [selectedStoreId]);

  if (!selectedStoreId) return <div></div>;

  return (
    <Modal
      title="Confirm lining up?"
      okText={nextSlotAvailable !== "" ? "Confirm" : "Cancel"}
      visible={openModal}
      onOk={handleConfirm}
      confirmLoading={loading}
      onCancel={handleCancel}
    >
      {selectedStore && (
        <div>
          <h3>{selectedStore.address}</h3>
          {nextSlotAvailable !== "" ? (
            <p>
              Next enter time available:{" "}
              {moment(nextSlotAvailable, "YYYY-MM-DD HH:mm:ss").format(
                " MMMM Do - h:mm a"
              )}
            </p>
          ) : (
            <p>
              No more enter times are available for this store today, try
              another store or tomorrow
            </p>
          )}
          {(!currentUser || currentUser.isManager) && nextSlotAvailable && (
            <>
              {!noPhoneNumber && (
                <>
                  <p>Enter your phone number</p>
                  <Input
                    addonBefore={"+39"}
                    onChange={(e) =>
                      setUserPhoneNumber(
                        `+39${e.target.value.replace(/\D/g, "")}`
                      )
                    }
                  />
                </>
              )}
              <Checkbox onChange={() => setNoPhoneNumber(!noPhoneNumber)} init>
                I dont want to enter a phone number
              </Checkbox>
            </>
          )}
        </div>
      )}
    </Modal>
  );
};

export default LineUpModal;
