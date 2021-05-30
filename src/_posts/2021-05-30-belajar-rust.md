---
title:  "Mencoba Rust"
date:   2021-05-30T19:00:00+0700
author: Rahadian Yusuf
description: Saya mencoba belajar Rust
tags:
- programming
- indonesian
- rust
---

Di dunia pemrograman dan *software engineering* sering kali kita
bertemu dengan suatu *framework* baru atau malah bahasa pemrograman
baru. Iyap, *bahasa pemrograman*, yang dibuat karena seseorang atau suatu organisasi
tidak puas dengan bahasa-bahasa yang sudah ada sekarang ini yang dianggap
masih kurang cukup untuk membantu menyelesaikan masalah
di sisi *sofware engineering*.

<!-- more -->

Di beberapa bahasa pemrograman ini ada satu yang mulai naik pamor karena
berpotensi menghapus jenis *bug* yang sering muncul di banyak aplikasi. Bahasa itu bernama **Rust**
(dari nama jenis jamur, bukan karat). Bahasa ini  awalnya dikembangkan
oleh Mozilla tapi sekarang sudah dialihkan ke Rust Foundation.
Anggota Rust Foundation (selain Mozilla) termasuk Microsoft, Google, dan Facebook[^1].
Ini jelas-jelas mengindikasikan bahwa Rust mempunyai masa depan cerah dan
menjadikannya salah satu bahasa pemrograman penting.

## Alasan Rust menjadi populer?

Kenapa Rust jadi punya banyak *backing* dari perusahaan-perusahaan besar?
Rust memiliki fitur yang cukup unik, yaitu [*ownership*](https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html).
Intinya suatu value hanya dimiliki oleh satu dan *hanya* satu variabel.
Hal ini memungkinkan Rust untuk mengetahui kapan alokasi memori diperlukan dan
perlu dilepas tanpa secara eksplisit dikode maupun tanpa bantuan GC. Dengan konsep ini,
Rust membuat kita terhindar dari *bug-bug* terkait alokasi memori seperti *memory leak*
dengan membuatnya menjadi *compile error* ketimbang *runtime error*.

## Kode dalam Rust?

Untuk menggunakan Rust, kita pertama perlu menginstall *tool* bernama `rustup`,
yang bisa dicek [di sini](https://www.rust-lang.org/tools/install). Nanti akan
terinstal *tool-tool* seperti `rustc` (*compiler*-nya) dan `cargo` (semacam npm-nya Rust
bagi kalian orang-orang JavaScript.)

Setelah itu kita bisa mencoba meng-*compile* file Rust. Kode *hello world* di bawah kita
simpan di file `main.rs` lalu kita jalankan `rustc main.rs`.

```rs
fn main() {
  println!("Halo dunia");
}
```

Hasilnya bisa kita lihat di bawah:

![Hasil kompilasi](/img/posts/compile-rust.png)

Biasanya, untuk membuat proyek dalam Rust, kita menggunakan tool `cargo`. Untuk membuat
proyek baru, kita cukup jalankan perintah `cargo new nama_project`. Kemudian
kalau mau mencoba menjalankan programnya, kita jalankan perintah `cargo run` di dalam
folder proyeknya.

![Hasil kompilasi dengan menggunakan cargo](/img/posts/halo-using-cargo.png)

## Bagaimana proses belajarnya?

Saya mencoba belajar Rust dengan membuat proyek yang menurutku tergolong gila, yaitu
mencoba membuat emulator, berdasarkan [seri tutorial](https://www.youtube.com/playlist?list=PLrOv9FMX8xJHqMvSGB_9G9nZZ_4IgteYf) di Youtube.
Aslinya,  bahasa yang digunakan dalam tutorial tersebut adalah C++, namun saya mencoba
mem-*porting* kode itu dalam Rust.

Hasil kodenya lumayan berantakan, namun setidaknya saya paham sedikit mengenai Rust.
Konsep *ownership* ini adalah hal yang paling lama dipahami, dan ternyata cukup sulit
untuk membuat program dengan *circular reference* (yang muncul di kode asli dari tutorial),
memerlukan banyak *wrapper* agar bisa meniru kode tersebut.

Saat ini saya mau mencoba membuat ulang emulator tersebut dengan rencana agar bisa kupakai
di web browser juga.

*Bentar, emangnya bisa ya Rust di browser?*

## Rust di *browser* ?

Rust ini biasanya digunakan untuk membuat program di *native platform* (salah satu proyek awal
yang ditulis dalam Rust adalah *browser engine* untuk Mozilla Firefox.) Namun, dengan
adanya standar [WebAssembly](https://webassembly.org/) (Wasm), segala program yang biasanya di-*compile* ke *native architecture*
(seperti C, C++, dan tentunya Rust) bisa di-*compile* menjadi *bytecode* Wasm yang bisa dijalankan
di browser secara cepat. Mungkin suatu hari kubuat post-nya terkait Wasm ini.
Di Rust sendiri sudah ada [*tool*-nya](https://rustwasm.github.io/docs/book/introduction.html).

## Kalau mau coba belajar Rust di mana, ya?
Tim Rust memiliki [buku resmi](https://doc.rust-lang.org/book/title-page.html) yang bisa
digunakan untuk belajar Rust. Silakan bisa dicek di sana.

## Kesimpulan

Rust menjadi salah satu bahasa yang populer saat ini, dengan banyak *backing*-an dari
perusahaan-perusahaan ternama, namun memiliki konsep *ownership* yang tergolong baru bagi banyak
programmer. Mungkin di masa depan, saat kita mulai paham dengan konsep *ownership* ini, akan
semakin banyak aplikasi dan *service* dan bahkan sistem operasi baru yang ditulis dalam Rust.

[^1]: [https://foundation.rust-lang.org/members/](https://foundation.rust-lang.org/members/)
