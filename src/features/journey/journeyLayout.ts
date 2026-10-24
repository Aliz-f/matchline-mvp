import type {Match} from '../../types/domain';

/** Geometry of the Figma "Arsenal season journey" road (node 10:1963), in design pixels. */
export const ROAD_WIDTH = 1312;
const FIRST_Y = 120;
const GAP = 230;
const FOCUS_GAP = 260;
const LEFT_X = 360;
const FIRST_LEFT_X = 300;
const RIGHT_X = 1000;
const CARD_WIDTH = 280;
const CARD_HEIGHT = 100;

export type StopKind = 'played' | 'focus' | 'scheduled';
export type Side = 'left' | 'right';
export interface Point {x: number; y: number}
export interface Stop extends Point {match: Match; kind: StopKind; side: Side}

/** The highlighted stop is the live match, otherwise the first one still to be played. */
export function focusIndex(journey: Match[]): number {
  const live = journey.findIndex((match) => match.status === 'live');
  return live >= 0 ? live : journey.findIndex((match) => match.status === 'upcoming');
}

export function buildStops(journey: Match[]): Stop[] {
  const focus = focusIndex(journey);
  let y = FIRST_Y;
  return journey.map((match, index) => {
    if (index > 0) y += index === focus ? FOCUS_GAP : GAP;
    const side: Side = index % 2 === 0 ? 'left' : 'right';
    const x = side === 'right' ? RIGHT_X : index === 0 ? FIRST_LEFT_X : LEFT_X;
    const kind: StopKind = index === focus ? 'focus' : match.status === 'completed' ? 'played' : 'scheduled';
    return {match, kind, side, x, y};
  });
}

export const stageHeight = (stops: Stop[]) => (stops.at(-1)?.y ?? 0) + 100;

/** "The season keeps unfolding" sits across the road from the last stop (Figma: x 756 when it ends on the left). */
export const unfoldingX = (stops: Stop[]) => stops.at(-1)?.side === 'right' ? 300 : 756;

/** S-bend between two stops, using the same control-point ratios as the Figma road. */
const bend = (from: Point, to: Point) => {
  const dy = to.y - from.y;
  return `C${from.x} ${from.y + dy * 0.68} ${to.x} ${to.y - dy * 0.8} ${to.x} ${to.y}`;
};

/** Road from stop `start` to stop `end` (inclusive). Adds the entry stub and the exit tail at the ends. */
export function roadPath(stops: Stop[], start = 0, end = stops.length - 1): string {
  if (!stops.length || end < start) return '';
  const first = stops[start];
  if (!first) return '';
  const parts = [start === 0 ? `M${first.x} 24 V${first.y}` : `M${first.x} ${first.y}`];
  for (let i = start + 1; i <= end; i++) parts.push(bend(stops[i - 1]!, stops[i]!));
  if (end === stops.length - 1) parts.push(`V${stops[end]!.y + 40}`);
  return parts.join(' ');
}

/** Top-left corner of a fan discussion card, offset from its stop as in the Figma frame. */
export function discussionOrigin(stop: Stop): Point {
  const after = stop.kind === 'played';
  const offset = stop.side === 'left'
    ? after ? {x: 80, y: 140} : {x: -288, y: -182}
    : after ? {x: -60, y: 70} : {x: -4, y: -184};
  return {x: Math.max(16, stop.x + offset.x), y: stop.y + offset.y};
}

/** Dashed offshoot from a stop to the nearest point on its discussion card. */
export function offshoot(stop: Stop): [Point, Point] {
  const card = discussionOrigin(stop);
  const target = {
    x: Math.min(Math.max(stop.x, card.x), card.x + CARD_WIDTH),
    y: Math.min(Math.max(stop.y, card.y), card.y + CARD_HEIGHT),
  };
  return [{x: stop.x, y: stop.y}, target];
}

