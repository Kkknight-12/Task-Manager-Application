//
import Card from "./Card"
import Lists from "./List"
import Table from "./Table"
import Checkbox from "./Checkbox"

// ----------------------------------------------------------------------

export default function ComponentsOverrides(theme) {
  return Object.assign(Card(theme), Lists(theme), Table(theme), Checkbox(theme))
}
