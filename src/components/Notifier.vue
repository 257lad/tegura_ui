<template>
    <Transition name="slide">
        <div
            v-if="$store.state.notification && $store.state.notification.message"
            :class="['notifier flex gap-2', $store.state.notification?.type]"
            @click="$store.dispatch('clearMessage')"
        >
            <svg 
                v-if="$store.state.notification?.type === 'error'"
                xmlns="http://www.w3.org/2000/svg" width="20" height="20" 
                viewBox="0 0 24 24" fill="none" stroke="currentColor" 
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
            {{ $store.state.notification.message }}
        </div>
    </Transition>
</template>

<script>
export default {
    data() {
        return {
            time_out: null,
        }
    },
    watch: {
        "$store.state.notification": {
            deep: true,
            handler() {
                if (this.time_out) clearTimeout(this.time_out);
                this.time_out = setTimeout(
                    () => this.$store.dispatch("clearMessage"),
                    5000
                );
            },
        },
    }
}
</script>

<style scoped>
.notifier {
    position: fixed;
    top: 20px;
    left: 50%;
    width: 90%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    gap:10px;
    transform: translateX(-50%) translateY(0);
    background-color: #5D4FBF;
    color: white;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    transition: all 0.3s ease-in-out;
    cursor: pointer;
    z-index: 10000000000000000000;
}

svg {
    width:20px;
}

.notifier.error {
    background-color: #f44336;
}

.slide-enter-active,
.slide-leave-active {
    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
}

.slide-enter-from,
.slide-leave-to {
    transform: translateX(-50%) translateY(-100px);
    opacity: 0;
}
</style>