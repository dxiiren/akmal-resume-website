<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, FreeMode } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/free-mode'

defineProps<{
  slidesPerView?: number
  spaceBetween?: number
  showPagination?: boolean
}>()

const modules = [Pagination, FreeMode]
</script>

<template>
  <Swiper
    :modules="modules"
    :slides-per-view="slidesPerView || 1.15"
    :space-between="spaceBetween || 16"
    :free-mode="true"
    :pagination="showPagination ? { clickable: true, dynamicBullets: true } : false"
    :grab-cursor="true"
    class="mobile-carousel w-full"
  >
    <slot />
  </Swiper>
</template>

<style>
.mobile-carousel .swiper-pagination {
  position: relative;
  margin-top: 1rem;
}

.mobile-carousel .swiper-pagination-bullet {
  background: hsl(var(--primary));
  opacity: 0.3;
  transition: all 0.3s ease;
}

.mobile-carousel .swiper-pagination-bullet-active {
  opacity: 1;
  transform: scale(1.2);
}

.mobile-carousel .swiper-slide {
  height: auto;
}
</style>
