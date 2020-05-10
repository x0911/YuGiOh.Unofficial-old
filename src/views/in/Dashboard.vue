<template>
  <div>
    <div v-if="!params.type">
      <!-- Show all -->
      <dashboard-collections></dashboard-collections>
      <dashboard-tournaments></dashboard-tournaments>
    </div>
    <div v-else-if="params.type && !params.id">
      <!-- Show all of a type -->
      <dashboard-collections
        v-if="params.type == 'collections'"
      ></dashboard-collections>
      <dashboard-tournaments
        v-else-if="params.type == 'tournaments'"
      ></dashboard-tournaments>
      <error-404 v-else></error-404>
    </div>
    <div v-else>
      <!-- Show only one of a type -->
      <dashboard-one-collection
        v-if="params.type == 'collections'"
        :id="params.id"
      ></dashboard-one-collection>
      <dashboard-one-tournament
        v-else-if="params.type == 'tournaments'"
        :id="params.id"
      ></dashboard-one-tournament>
      <error-404 v-else></error-404>
    </div>
  </div>
</template>

<script>
export default {
  name: "user-dashboard",
  components: {
    DashboardCollections: () =>
      import("@/components/pages/dashboard/Collections.vue"),
    DashboardOneCollection: () =>
      import("@/components/pages/dashboard/collections/One-Collection.vue"),
    DashboardTournaments: () =>
      import("@/components/pages/dashboard/Tournaments.vue"),
    DashboardOneTournament: () =>
      import("@/components/pages/dashboard/tournaments/One-Tournament.vue"),
    Error404: () => import("@/views/errors/e404.vue")
  },
  data: () => ({}),
  computed: {
    params() {
      return this.$route.params;
    }
  }
};
</script>
