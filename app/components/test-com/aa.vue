<script setup>
// v-dialog
const dialog = ref(false)
const activator = ref(null)

// v-confirm-edit
const confirm = ref(null)

const model = ref({
    name: '',
    progress: 0,
})

const selected = ref()

const headers = [
    { title: 'ID', value: 'id' },
    { title: 'Name', value: 'name' },
    { title: 'Progress', value: 'progress' },
    { title: 'Actions', value: 'actions' },
]

const items = ref([
    { id: 1, name: 'Tumwater', progress: 50 },
    { id: 2, name: 'Siena', progress: 73 },
    { id: 3, name: 'Cold Harbor', progress: 100 },
    { id: 4, name: 'Cairns', progress: 92 },
    { id: 5, name: 'Allentown', progress: 40 },
])

// Adjust progress bar color based on progress
const color = computed(() => (progress) => {
    if (progress === 100)
        return 'green-lighten-2'
    if (progress >= 90)
        return 'green-lighten-4'
    if (progress >= 70)
        return 'light-green-lighten-2'
    if (progress >= 50)
        return 'light-green-lighten-4'
    return 'blue-grey'
})

// Register current, hovered row to activator
// Preferrably called before edit()
function register(event) {
    activator.value = event.currentTarget
}

// Select & load data to be edited
function edit(item) {
    selected.value = item.id
    model.value = { name: item.name, progress: item.progress }
}

// Update item data
function save() {
    dialog.value = false

    items.value = items.value.map(item =>
        item.id === selected.value
            ? { ...item, name: model.value.name, progress: model.value.progress }
            : item,
    )
}

function remove(id) {
    items.value = items.value.filter(item => item.id !== id)
}
</script>

<template>
    <v-data-table :headers="headers" :items="items">
        <template #item.progress="{ item }">
            <v-progress-linear
                :color="color(item.progress)"
                :model-value="item.progress"
                height="25"
            >
                <template #default="{ value }">
                    <strong>{{ value }}%</strong>
                </template>
            </v-progress-linear>
        </template>

        <template #item.actions="{ item }">
            <v-btn
                variant="text"
                icon
                @click="edit(item)"
                @mouseenter="register($event)"
            >
                <v-icon>mdi-pencil</v-icon>
            </v-btn>

            <v-btn variant="text" icon @click="remove(item.id)">
                <v-icon>mdi-delete</v-icon>
            </v-btn>
        </template>
    </v-data-table>

    <v-dialog v-model="dialog" :activator="activator" max-width="500">
        <v-confirm-edit
            ref="confirm"
            v-model="model"
            ok-text="save"
            @save="save"
        >
            <template #default="{ model: proxyModel }">
                <v-card title="Modify Data">
                    <v-card-text>
                        <v-text-field
                            v-model="proxyModel.value.name"
                            label="Modify name"
                        />

                        <v-number-input
                            v-model="proxyModel.value.progress"
                            label="Modify progress"
                            :max="100"
                            :min="0"
                        />
                    </v-card-text>

                    <template #actions>
                        <!-- <v-spacer />
                        <component :is="actions" /> -->
                        <VCardActions>
                            <VBtn color="warning" prepend-icon="mdi-close" text="Close" @click="dialog = false" />
                            <VBtn color="primary" prepend-icon="mdi-content-save" text="Save" />
                        </VCardActions>
                    </template>
                </v-card>
            </template>
        </v-confirm-edit>
    </v-dialog>
</template>
