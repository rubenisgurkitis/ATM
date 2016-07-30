export default function setLoading(value) {
  if (value) {
    document.body.classList.add('loading');
  } else {
    document.body.classList.remove('loading');
  }
}
