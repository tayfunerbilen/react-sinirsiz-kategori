# React ile Sınırsız Kategori Örneği

Videoda birlikte hazırladığımız dersin kaynak kodlarını bu repoda bulabilirsiniz.

Ben genelde sınırsız kategori yaparken şöyle bir yapıda ilerliyorum veritabanı kısmında:

```
    id  |   name    |   parent   
    1   |   cat1    |   0
    2   |   cat2    |   0
    3   |   cat3    |   0
    4   |   cat1-1  |   1
    5   |   cat1-2  |   1
    6   |   cat3-1  |   2
    7   |   cat12-1 |   5
```

Böylece listelerken tamamını tek bir dizide listeliyorum ve recursive bi fonksiyon ile ön tarafta hem `breadcrumb` yapıyorum hem de listelemede yönetiyorum.

Ayrıca derste sahibinden.com tarzı kategori seçimi için de bir örnek hazırladık.

## Demo
[https://react-sinirsiz-kategori-prototurk.netlify.app/](https://react-sinirsiz-kategori-prototurk.netlify.app/)
