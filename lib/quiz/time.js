export function millimizeTime({ hh, mm, ss }) {
  let h = parseInt(hh),
    m = parseInt(mm),
    s = parseInt(ss)

  // if hh convert it to milliseconds
  if (h > 0) h = h * 60 * 60 * 1000
  // if mm convert it to milliseconds
  if (m > 0) m = m * 60 * 1000
  // if ss convert it to milliseconds
  if (s > 0) s = s * 1000

  return h + m + s
}
