<script lang="ts" setup>
import { nextTick } from 'vue'

const { mobile } = useDisplay()
const layoutStore = useLayoutStore()
const open = ref(['Users'])
const cruds = [
    { title: 'Product', icon: 'mdi-package', to: '/product' },
    { title: 'Validate [zod.dev]', icon: 'mdi-format-underline-wavy', to: '/validate' },
    { title: 'Customer[test]', icon: 'mdi-package', to: '/customer' },
    { title: 'Test Bug', icon: 'mdi-bug', to: '/bug' },
]
const logoMini = ref(layoutStore.state.rail)
const scrollbarRef = ref()
const isHovered = ref(false)

function updateScrollbar() {
    nextTick(() => {
        if (scrollbarRef.value?.$el) {
            const psElement = scrollbarRef.value.$el.querySelector('.ps')
            if (psElement && psElement.$ps) {
                psElement.$ps.update()
            }
        }
    })
}

function onRailUpdate(val: boolean) {
    if (!layoutStore.state.rail)
        return logoMini.value = false

    logoMini.value = val
}

const iconDrawer = computed(() => {
    if (!mobile.value) {
        return layoutStore.state.rail ? 'mdi:arrow-right' : 'mdi:arrow-left'
    }
    else {
        return layoutStore.state.drawer ? 'mdi-menu-open' : 'mdi-menu-close'
    }
})

onMounted(() => {
    watch(() => layoutStore.state.rail, (newVal) => {
        logoMini.value = newVal
        updateScrollbar()
    })

    watch(() => layoutStore.state.drawer, (newVal) => {
        if (!mobile.value)
            return

        logoMini.value = !newVal
        updateScrollbar()
    })
})
</script>

<template>
    <v-navigation-drawer
        v-model="layoutStore.state.drawer"
        class="layout_navigation"
        elevation="2"
        expand-on-hover
        :rail="layoutStore.state.rail"
        @update:rail="onRailUpdate"
        @mouseenter="isHovered = true"
        @mouseleave="isHovered = false"
    >
        <!-- Toggle Button at Edge -->
        <v-btn
            v-if="!mobile"
            size="x-small"
            color="primary"
            variant="flat"
            class="toggle-btn-edge"
            @click="layoutStore.toggleDrawer()"
        >
            <v-icon size="16" class="animate-head-shake animate-duration-6s animate-count-infinite">
                {{ iconDrawer }}
            </v-icon>
        </v-btn>

        <PerfectScrollbar
            ref="scrollbarRef"
            class="drawer-content"
            :options="{
                wheelSpeed: 1,
                wheelPropagation: false,
                swipeEasing: true,
                suppressScrollX: true,
                useBothWheelAxes: false,
            }"
        >
            <div class="drawer-inner">
                <v-list>
                    <v-list-item
                        v-if="layoutStore.state.rail && !isHovered"
                        prepend-icon="mdi-dog"
                    />
                    <v-list-item
                        v-else
                        prepend-avatar="https://randomuser.me/api/portraits/women/44.jpg"
                        subtitle="abc@gmail.com"
                    />
                </v-list>
                <v-divider />
                <v-list v-model:opened="open" color="primary" density="compact" nav>
                    <v-list-item
                        prepend-icon="mdi-home"
                        title="Home"
                        value="/"
                        to="/"
                    />
                    <v-list-group value="Users">
                        <template #activator="{ props }">
                            <v-list-item
                                v-bind="props"
                                active-class="nav_active"
                                prepend-icon="mdi-test-tube" 
                                title="Menu 1"
                            />
                        </template>
                        <v-list-item
                            v-for="(row, index) in cruds" 
                            :key="index"
                            rounded="lg"
                            :title="row.title"
                            :prepend-icon="row.icon"
                            :value="row.to"
                            :to="row.to"
                        />
                    </v-list-group>
                </v-list>
            </div>
        </PerfectScrollbar>
    </v-navigation-drawer>
</template>

<style scoped>
.layout_navigation {
    position: relative;
}

.drawer-content {
    height: 100%;
    max-height: calc(100vh - 64px);
    overflow: hidden;
    position: relative;
}

.drawer-inner {
    padding: 8px 0;
}

/* Perfect Scrollbar Styling */
.drawer-content .ps {
    height: 100%;
}

.drawer-content .ps__rail-y {
    width: 6px;
    background: transparent;
    opacity: 0;
    transition: opacity 0.3s ease;
    right: 2px;
}

.drawer-content:hover .ps__rail-y {
    opacity: 0.6;
}

.drawer-content .ps__thumb-y {
    background-color: rgba(var(--v-theme-on-surface), 0.3);
    border-radius: 3px;
    width: 4px;
    right: 1px;
    transition: background-color 0.3s ease;
}

.drawer-content:hover .ps__thumb-y {
    background-color: rgba(var(--v-theme-on-surface), 0.5);
}

.drawer-content .ps__rail-x {
    display: none;
}

.toggle-btn-edge {
    position: absolute;
    top: 20px;
    right: -13.2px;
    z-index: 1000;
    border-radius: 50% !important;
    width: 26.4px !important;
    height: 26.4px !important;
    min-width: 26.4px !important;
    transition: all 0.2s ease;
}

.toggle-btn-edge::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 38px;
    height: 38px;
    background: linear-gradient(to right, rgba(138, 141, 147, 0.3) 50%, transparent 50%);
    border-radius: 18.7px;
    z-index: -1;
}

.toggle-btn {
    border-radius: 50% !important;
    width: 24px !important;
    height: 24px !important;
    min-width: 24px !important;
    transition: all 0.2s ease;
}

.toggle-btn:hover {
    transform: scale(1.1);
    opacity: 0.8;
}
</style>
