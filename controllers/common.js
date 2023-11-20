import { State, City } from "../models/common.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";

// --------------------------------------------------------------STATE ---------------------------------------------------------

// ----------------------------------------------------------------ADMIN FUNCTIONS --------------------------------------------------

/*
    /api/v1/state
    METHOD POST
*/

export const createState = async (req, res, next) => {
  const { name } = req.body;
  try {
    const state = await State.findOne({ name: name.toLowerCase() });
    if (state) {
      return next(new ErrorHandler("State Already Exists", 400));
    }
    await State.create({
      name: name.toLowerCase(),
    });
    return res.json({ error: false, message: "State Created Successfully" });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// ----------------------------------------------------------------ADMIN FUNCTIONS --------------------------------------------------

// ----------------------------------------------------------------PUBLIC FUNCTIONS ------------------------------------------------

/*
    /api/v1/state/get
    METHOD GET
*/

export const getStates = async (req, res, next) => {
  try {
    const state = await State.find({ status: true }).select("name");
    return res.json({ error: false, data: state });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// ----------------------------------------------------------------PUBLIC FUNCTIONS ------------------------------------------------

// --------------------------------------------------------------STATE ---------------------------------------------------------



// --------------------------------------------------------------CITY ---------------------------------------------------------

// ----------------------------------------------------------------ADMIN FUNCTIONS --------------------------------------------------

/*
    /api/v1/state
    METHOD POST
*/

export const createCity = async (req, res, next) => {
    const { name ,state} = req.body;
    try {
      const city = await City.findOne({state ,name: name.toLowerCase() });
      if (city) {
        return next(new ErrorHandler("City Already Exists", 400));
      }
      await City.create({
        state,
        name: name.toLowerCase(),
      });
      return res.json({ error: false, message: "City Created Successfully" });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  };
  
  // ----------------------------------------------------------------ADMIN FUNCTIONS --------------------------------------------------
  
  // ----------------------------------------------------------------PUBLIC FUNCTIONS ------------------------------------------------
  
  /*
      /api/v1/state/get/:id
      METHOD GET
  */
  
  export const getCity = async (req, res, next) => {
    const {id} = req.params
    try {
      const cities = await City.find({state:id, status: true }).select("name");
      return res.json({ error: false, data: cities });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  };
  
  // ----------------------------------------------------------------PUBLIC FUNCTIONS ------------------------------------------------
  
  // --------------------------------------------------------------CITY ---------------------------------------------------------
  