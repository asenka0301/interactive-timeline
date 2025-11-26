export const TIMELINE_HEADER_NUMBER_DURATION = 0.6;
export const TIMELINE_HEADER_ORBITNAVIGATION_DURATION = 1;

// синхронизируем анимацию слайдера при смене категорий с анимацией круга
// на угасание предыдущего слайдера отдадим 80% времени, остальное на появление нового слайдера
export const TIMELINE_SLIDER_PREV_SLIDE_DURATION =
  TIMELINE_HEADER_ORBITNAVIGATION_DURATION * 0.8;
export const TIMELINE_SLIDER_NEXT_SLIDE_DELAY =
  TIMELINE_SLIDER_PREV_SLIDE_DURATION;
export const TIMELINE_SLIDER_NEXT_SLIDE_DURATION =
  TIMELINE_HEADER_ORBITNAVIGATION_DURATION - TIMELINE_SLIDER_NEXT_SLIDE_DELAY;
