/**
 * Enum for the rating
 */
enum HoursMetRating {
    None = 1,
    Some,
    All
}

/**
 * Custom time interface.
 */
interface AverageTime {
    hours: number;
    minutes: number;
}

/**
 * The interface will be called trainingSchedule.
 * 
 */
interface trainingSchedule  {
    numberOfDays: number;
    numberOfTrainingDays: number;
    originalTargetValue: number;
    calculatedAverageTime: AverageTime;
    targetReached: boolean;
    rating: HoursMetRating;
    ratingMessage: string;
}

/**
 * 
 * @return a trainingShedule.
 */
// const calculateExcersises = (hoursPerDay: number[]) :trainingSchedule =>  {
// }
