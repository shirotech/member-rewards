1. Seems like API 1 and 4 are connecting to the `Postgres` directly, there are some potential bottlenecks if it's high transaction without using a local caching service.

2. * Any staging or testing instances that are not required to be running all the time can take advantage of the auto scaling groups. You can set a period where it scales the instances to `0` when no one is using it, effectively no costs will be incurred.
   * Use S3 for serving UI applications that are purely static content instead of requiring an EC2 instance.
   * Another option is to look for a cheaper alternative to AWS.
   
3. * Outsourcing software development can cut costs, but it can heavily compromise the quality and control of the code base. From experience, they will have a higher rate of defects due to lack to knowledge of internal systems and structure. They have many clients, so process can be a nightmare to get them to do what we want.
   * Outsourcing DevOps can have the same problem. In addition, it can also be a security risk trusting third parties to manage your critical infrastructures.