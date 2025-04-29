const roomSchema = require("../../Schemas/RoomSchema");

const getAllRooms = async (req, res) => {
  const { landlordId } = req.body;
  try {
    const pendingRooms = await roomSchema.find({
      landlordId: landlordId,
    });

    if (!pendingRooms) {
      return res.status(404).json({
        success: false,
        message: "You have not posted rooms",
      });
    }

    return res.status(200).json({
      success: true,
      message: pendingRooms,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

const getRoomById = async (req, res) => {
  const { landlordId } = req.body;
  const { id } = req.params;
  try {
    const findSingleRoom = await roomSchema.findOne({
      _id: id,
      landlordId: landlordId,
    });

    if (!findSingleRoom) {
      return res.status(404).json({
        success: false,
        message: "The desired room do not exists",
      });
    }

    return res.status(200).json({
      success: true,
      message: findSingleRoom,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

const editRoomBy = async (req, res) => {
  const userData = req.userData;
  const { id } = req.params;
  try {
    const findSingleRoom = await roomSchema.findById(id);

    if (!findSingleRoom) {
      return res.status(404).json({
        success: false,
        message: "The desired room do not exists",
      });
    }

    return res.status(200).json({
      success: true,
      message: findSingleRoom,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

const saveEditedRooms = async (req, res) => {
  const userData = req.userData;
  const { id } = req.params;

  const updateData = req.body;
  // console.log("Data: ",updateData)

  try {
    let existingRoom = await roomSchema.findById(id);
    if (!existingRoom) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    if (existingRoom.landlordId.toString() !== userData.id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to update this room",
      });
    }
    const updatedRoom = await roomSchema.findByIdAndUpdate(
      id,
      {
        $set: updateData,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedRoom) {
      return res.status(404).json({
        success: false,
        message: "Cannot update now please try again later",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Room Updated Successfully",
      data: updatedRoom,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { getAllRooms, getRoomById, editRoomBy, saveEditedRooms };
