export default function setLoading(value) {
  // Adds or removes the loading class to the body
  if (value) {
    document.body.classList.add('loading');
  } else {
    document.body.classList.remove('loading');
  }
}
