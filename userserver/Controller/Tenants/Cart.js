const watchLists = require("../../Schemas/WatchListsSchema");

const saveToWatchLists = async (req, res) => {
  const {
    roomId,
    landlordId,
    basic,
    features,
    images,
    isVerified,
    location,
    contact,
    payment,
    pinnedLocation,
  } = req.body;
  const userData = req.userData;

  try {
    const getWatchLists = await watchLists.findOne({
      roomId: roomId,
      landlordId: landlordId,
      userId: userData.id,
    });

    if (getWatchLists) {
      return res.status(400).json({
        success: false,
        message: "Room Already exists on the watchlist",
      });
    }

    const newWatchLists = new watchLists({
      roomId,
      landlordId,
      basic,
      features,
      images,
      isVerified,
      location,
      contact,
      payment,
      userId: userData.id,
      pinnedLocation,
    });
    await newWatchLists.save();

    console.log(newWatchLists);

    return res.status(200).json({
      success: true,
      message: "Room Added to the watchlists",
      watchlists: newWatchLists,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getSingleWatchList = async (req, res) => {
  const userData = req.userData;
  const { id } = req.params;
  try {
    const getWatchLists = await watchLists.findOne({
      _id: id,
      userId: userData.id,
    });
    console.log(getWatchLists);

    if (!getWatchLists) {
      return res.status(400).json({
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      message: getWatchLists,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getWatchLists = async (req, res) => {
  const userData = req.userData;

  try {
    console.log(userData);
    const getWatchLists = await watchLists.find({ userId: userData.id });
    console.log(getWatchLists);
    if (!getWatchLists) {
      return res.status(400).json({
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      message: getWatchLists,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteItems = async (req, res) => {
  const { id } = req.params;

  try {
    const getWatchLists = await watchLists.findByIdAndDelete(id);

    if (!getWatchLists) {
      return res.status(400).json({
        success: false,
        message: "No room found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Room Removed from the watchlists",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  saveToWatchLists,
  getWatchLists,
  deleteItems,
  getSingleWatchList,
};
